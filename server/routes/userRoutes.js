const UserRoutes = require('express').Router();
const {register, login} = require('../controllers/usersController');
UserRoutes.post('/register',register);
UserRoutes.post('/login',login);
module.exports= UserRoutes;