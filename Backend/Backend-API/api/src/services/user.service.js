import userModel from '../model/user.model.js';

const createUserService = (userInfos) => userModel.create(userInfos);

const findAllUsersService = () => userModel.find();

const findUserByIdService = (id) => userModel.findOne({_id: id})

export default { 
  createUserService,
  findAllUsersService,
  findUserByIdService,
};