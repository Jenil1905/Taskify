import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  Menu, X, Plus, Filter, Search, Folder, User, Target, CheckCircle2,
  Pencil, Trash2, LogOut, Layers, Tags, Calendar, Check, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, createTask, updateTask, deleteTask } from '../apiCalls/taskCalls';

const categories = [
  { key: 'All', label: 'All Tasks', color: 'from-indigo-500 to-purple-600', border: 'border-indigo-500', icon: Layers },
  { key: 'Work', label: 'Work', color: 'from-blue-500 to-indigo-500', border: 'border-blue-500', icon: Folder },
  { key: 'Personal', label: 'Personal', color: 'from-purple-500 to-pink-500', border: 'border-purple-500', icon: User },
  { key: 'Study', label: 'Study', color: 'from-green-500 to-emerald-500', border: 'border-green-500', icon: Target },
];

function ProgressBar({ value }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">Today's Progress</span>
        <span className="text-indigo-600 font-bold">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button className="p-1 rounded hover:bg-white/20" onClick={onClose}><X size={20} /></button>
          </div>
          <div className="p-6">{children}</div>
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBadge({ category }) {
  const cat = categories.find(c => c.key === category) || { label: category, color: 'from-gray-500 to-gray-600', icon: Tags };
  const Icon = cat.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${cat.color} text-white`}>
      <Icon size={14} /> {cat.label}
    </span>
  );
}

function TaskRow({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="group flex items-center gap-3 p-3 bg-white rounded-xl border hover:shadow-md transition-all">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => onToggle(task.id, !task.isDone)}
        className="w-5 h-5 accent-indigo-600 rounded"
      />
      <div className="flex-1">
        <div className={`font-medium ${task.isDone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {task.title}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <CategoryBadge category={task.category} />
          {task.createdAt && (
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} /> {new Date(task.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => onEdit(task)}>
          <Pencil size={18} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => onDelete(task.id)}>
          <Trash2 size={18} className="text-rose-600" />
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [showDone, setShowDone] = useState(true);
  const [sortBy, setSortBy] = useState('dueAsc');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTasks(activeCat !== 'All' ? activeCat : '');
      setTasks(data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [activeCat, navigate]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const doneCount = tasks.filter(t => t.isDone).length;
  const progress = tasks.length ? (doneCount / tasks.length) * 100 : 0;

  const filtered = useMemo(() => {
    let arr = [...tasks];
    if (!showDone) arr = arr.filter(t => !t.isDone);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (sortBy === 'dueAsc') {
      arr.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
    } else if (sortBy === 'dueDesc') {
      arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    } else if (sortBy === 'title') {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [tasks, showDone, query, sortBy]);

  const countsByCat = useMemo(() => {
    const res = { All: tasks.length };
    categories.slice(1).forEach(c => { res[c.key] = tasks.filter(t => t.category === c.key).length; });
    return res;
  }, [tasks]);

  const handleToggleDone = async (id, isDone) => {
    try {
      await updateTask(id, { isDone });
      await getTasks(); // Re-fetch to ensure UI is in sync
    } catch (err) {
      console.error(err);
      alert('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await getTasks(); // Re-fetch to ensure UI is in sync
    } catch (err) {
      console.error(err);
      alert('Failed to delete task.');
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      title: form.title.value.trim() || '',
      category: form.category.value || 'Work',
      description: form.description.value || '',
      isDone: form.isDone.checked,
    };
    if (!payload.title) return;

    try {
      if (editing) {
        await updateTask(editing.id, payload);
      } else {
        await createTask(payload);
      }
      
      await getTasks(); // Re-fetch to ensure UI is in sync
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      alert(`Failed to ${editing ? 'update' : 'create'} task.`);
    }
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded hover:bg-white/10" onClick={() => setMobileNavOpen(v => !v)}>
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Taskify
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 flex items-center gap-2" onClick={openCreate}>
              <Plus size={18} /> Add Task
            </button>
            <button className="px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className={`md:col-span-3 ${mobileNavOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-2xl shadow-md border p-4">
              <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
                <Filter size={18} /> Filters
              </div>
              <div className="space-y-2">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const active = activeCat === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => { setActiveCat(cat.key); setMobileNavOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                        active ? `bg-gradient-to-r ${cat.color} text-white border-transparent` : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={18} />
                        {cat.label}
                      </span>
                      <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-gray-500'}`}>
                        {countsByCat[cat.key] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Search tasks..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    Show completed
                  </label>
                  <input
                    type="checkbox"
                    checked={showDone}
                    onChange={e => setShowDone(e.target.checked)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1.5 block">Sort by</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="w-full appearance-none pl-3 pr-9 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="dueAsc">Due date (asc)</option>
                      <option value="dueDesc">Due date (desc)</option>
                      <option value="title">Title (A–Z)</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <ProgressBar value={progress} />
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="md:col-span-9">
            {/* Section header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
              <div className="flex md:hidden items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-white text-indigo-600 border hover:bg-gray-50 flex items-center gap-2" onClick={openCreate}>
                  <Plus size={18} /> Add Task
                </button>
              </div>
            </div>

            {/* Category overview cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {categories.slice(1).map(cat => {
                const Icon = cat.icon;
                const count = tasks.filter(t => t.category === cat.key).length;
                return (
                  <div key={cat.key} className={`p-4 rounded-2xl border-l-4 ${cat.border} bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-gray-800">
                        <Icon size={18} /> {cat.label} ({count})
                      </div>
                      <CheckCircle2 className="text-gray-300" size={18} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Task list */}
            <div className="bg-white rounded-2xl shadow-md border p-4">
              {loading ? (
                <div className="text-center py-16">
                  <p className="text-gray-800 font-medium">Loading tasks...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                    <Tags className="text-indigo-600" size={20} />
                  </div>
                  <p className="text-gray-800 font-medium">No tasks found</p>
                  <p className="text-gray-500 text-sm">Try changing filters or add a new task.</p>
                  <button
                    onClick={openCreate}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Plus size={16} /> Add Task
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map(t => (
                    <TaskRow
                      key={t.id}
                      task={t}
                      onToggle={handleToggleDone}
                      onEdit={openEdit}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Update Task' : 'Add Task'}
        actions={
          <>
            <button
              onClick={() => setFormOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              form="task-form"
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {editing ? 'Save Changes' : 'Create Task'}
            </button>
          </>
        }
      >
        <form id="task-form" onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              defaultValue={editing?.title || ''}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="What needs to be done?"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                defaultValue={editing?.category || 'Work'}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option>Work</option>
                <option>Personal</option>
                <option>Study</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="due"
                defaultValue={editing?.createdAt ? editing.createdAt.substring(0, 10) : ''}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="description" // Corrected name
              rows={3}
              defaultValue={editing?.description || ''} // Corrected value
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Optional details..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="isDone" // Corrected id
              name="isDone" // Corrected name
              type="checkbox"
              defaultChecked={editing?.isDone || false} // Corrected value
              className="w-5 h-5 accent-indigo-600"
            />
            <label htmlFor="isDone" className="text-sm text-gray-700">Mark as done</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}