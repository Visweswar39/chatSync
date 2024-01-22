const UserRoutes = require('express').Router();
const {register} = require('../controllers/usersController');
UserRoutes.post('/register',register);
module.exports= UserRoutes;