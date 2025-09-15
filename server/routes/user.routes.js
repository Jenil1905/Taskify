const express = require('express');
const isAuth = require('../middleware/isAuth.js');
const {getCurrentUser} = require('../controllers/user.controller.js')


const router = express.Router();


router.get('/current', isAuth, getCurrentUser);

module.exports = router;