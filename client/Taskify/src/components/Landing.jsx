import React, { useState } from 'react';
import { Menu, X, CheckCircle, User, Folder, Target, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  //handle Singup
  function handleSignup(){
    navigate('/signup')
  }

  //handle Login
  function handleLogin(){
    navigate('/login')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg backdrop-blur-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Taskify
            </div>
            <ul className="hidden md:flex space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className=" hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className=" hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Demo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className=" hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Contact
                </button>
              </li>
              <li>
                <button className='hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5' onClick={handleSignup}>SignUp</button>
              </li>
              <li>
                <button className='hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5' onClick={handleLogin}>Login</button>
              </li>
            </ul>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-left hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded transition-all"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="text-left hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded transition-all"
                >
                  Demo
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-left hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded transition-all"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce hidden lg:block" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400 bg-opacity-20 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-pink-400 bg-opacity-20 rounded-full animate-bounce hidden lg:block" style={{ animationDuration: '4s' }}></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div id="hero-title">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Organize Your Life with{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Taskify
                </span>
              </h1>
            </div>
            
            <div id="hero-subtitle">
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                The ultimate task manager that helps you stay organized, focused, and productive. 
                Categorize, prioritize, and conquer your goals.
              </p>
            </div>
            
            <div id="hero-buttons">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2" onClick={handleSignup}>
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div id="features-title">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Everything You Need to Stay{' '}
                <span className="text-indigo-600">Organized</span>
              </h2>
            </div>
            <div id="features-subtitle">
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built by students, for students and professionals who want to take control of their productivity
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div id="feature-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Secure Authentication</h3>
                <p className="text-gray-600 text-center">
                  JWT-based login system with secure registration. Your data is protected with industry-standard security measures.
                </p>
              </div>
            </div>

            <div id="feature-2">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Folder className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Smart Categories</h3>
                <p className="text-gray-600 text-center">
                  Organize tasks by categories with powerful filtering. Work, Personal, Study - keep everything sorted and accessible.
                </p>
              </div>
            </div>

            <div id="feature-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Track Progress</h3>
                <p className="text-gray-600 text-center">
                  Mark tasks as complete and watch your productivity soar. Visual progress tracking keeps you motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Demo Preview Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div id="demo-title">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                See Taskify in Action
              </h2>
            </div>
            <div id="demo-subtitle">
              <p className="text-xl text-gray-600">
                A clean, intuitive interface designed for maximum productivity
              </p>
            </div>
          </div>

          <div id="demo-preview">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-800 px-6 py-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-gray-300 text-sm">Taskify Dashboard</div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800">My Tasks</h3>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <span>Add Task</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Work Category */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <Folder size={16} />
                        Work (3)
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-blue-600 w-4 h-4" />
                          <span className="text-gray-700">Review project proposal</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-500 line-through">Team meeting at 2pm</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-blue-600 w-4 h-4" />
                          <span className="text-gray-700">Update documentation</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Personal Category */}
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <User size={16} />
                        Personal (2)
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-purple-600 w-4 h-4" />
                          <span className="text-gray-700">Grocery shopping</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-purple-600 w-4 h-4" />
                          <span className="text-gray-700">Call dentist</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Study Category */}
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <Target size={16} />
                        Study (1)
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-500 line-through">Complete React assignment</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Today's Progress</span>
                      <span className="text-indigo-600 font-bold">66%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full" style={{width: '66%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div id="cta-title">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
          </div>
          <div id="cta-subtitle">
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Join thousands of students and professionals who've already organized their lives with Taskify
            </p>
          </div>
          <div id="cta-buttons">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Start Your Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Taskify</h3>
              <p className="text-gray-400">
                Built with passion by students, designed for everyone who wants to stay organized and productive.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">Task Management</button></li>
                <li><button className="hover:text-white transition-colors text-left">Categories</button></li>
                <li><button className="hover:text-white transition-colors text-left">Progress Tracking</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button className="hover:text-white transition-colors text-left">Documentation</button></li>
                <li><button className="hover:text-white transition-colors text-left">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Taskify. Made with ❤️ by students for productivity enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;