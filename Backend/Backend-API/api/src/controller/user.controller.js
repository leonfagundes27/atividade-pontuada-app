import userService from '../services/user.service.js';

// Cria um novo usuário
const createUser = async (req, res) => {
  try {
    const usuarioCriado = await userService.createUserService(req.infos);
    res.status(201).send({ msg: 'Usuário cadastrado com sucesso'});
  } 
  catch (err) {
    res.status(500).send({ err: 'Erro ao cadastrar usuário' });
  }
};

// Lista todos os usuários
const findAllUsers = async (req, res) => {
  try {
    res.status(200).send(req.registeredUsers);
  }
  catch (err) {
    res.status(500).send({ err: "Erro ao buscar todos os usuários" });
  }
}

export { 
  createUser,
  findAllUsers,
}