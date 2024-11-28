import userService from "../services/user.service.js";
import { check, validationResult } from "express-validator";

// Middleware de validação de formulário usando a biblioteca express-validator
const validateForm = [
  check("username")
    .notEmpty().trim().withMessage("O nome de usuário é obrigatório.")
    .isLength({ min: 3 }).withMessage("O nome de usuário deve ter no mínimo 3 caracteres.")
    .isLength({ max: 50 }).withMessage("O nome de usuário deve ter no máximo 50 caracteres.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s~]+$/).withMessage("O campo nome só pode ter letras, espaços e caracteres acentuados."),

  check("email")
    .notEmpty().withMessage("O email é obrigatório.")
    .isEmail().withMessage("Informe um email válido."),

  check("password")
    .notEmpty().withMessage("A senha é obrigatória.")
    .isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres.")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }).withMessage(
      "A senha não é segura. Informe no mínimo 1 caractere maiúsculo, 1 minúsculo, 1 número e 1 caractere especial."),
  
      (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).send({ err: err.array() });
    }

    const { username, email, password } = req.body;
    req.infos = { username, email, password };

    next();
  },
];

// Middleware para validar usuários registrados
const validateRegisteredUsers = async (req, res, next) => {
  try {
    const registeredUsers = await userService.findAllUsersService();

    if (!registeredUsers || registeredUsers.length == 0) {
      return res
        .status(404)
        .send({ err: "Não há usuários cadastrados no banco de dados..." });
    }

    req.registeredUsers = registeredUsers;

    next();
  } catch (err) {
    res.status(500).send({ err: "Erro ao verificar usuários cadastrados" });
  }
};

export { validateForm, validateRegisteredUsers };
