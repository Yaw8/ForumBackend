const routr=require('express').Router();

//importing auth middleware
const auth = require('../middleware/auth');

const {createUser, getUsers, getUserById, login}=require('./user.controler');
routr.post('/',createUser);
routr.get('/all', getUsers);
routr.get('/', auth, getUserById);
routr.post('/login', login);
module.exports=routr;