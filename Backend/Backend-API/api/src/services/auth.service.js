import userModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';

const loginService = (email) => userModel.findOne({ email: email }).select('+password')

const genereteToken = (id, email) => jwt.sign({id: id, email: email}, process.env.SECRET_JWT, {expiresIn: 86400});


export { loginService, genereteToken };