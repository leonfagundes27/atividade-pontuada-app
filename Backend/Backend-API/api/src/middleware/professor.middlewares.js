import { check, validationResult } from "express-validator";
import professorService from "../services/professor.service.js";
import courseService from "../services/course.service.js";
import { checkCourseExistence } from "../middleware/course.middleware.js";
import mongoose from "mongoose";

// Middleware de validação de professores registrados
const ValidRegisteredProfessors = async (req, res, next) => {
  try {
    const professors = await professorService.findAllService();

    if (!professors || professors.length === 0) {
      return res.status(400).send({ msg: "Não há professores cadastrados" });
    }

    req.professors = professors;

    next();
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// Middleware de validação do formulário
const ValidForm = [
  check("nome")
    .notEmpty().trim().withMessage("O campo nome é obrigatório.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s~]+$/).withMessage("O campo nome só pode ter letras, espaços e caracteres acentuados.")
    .isLength({ min: 3 }).withMessage("O campo nome precisa ter no mínimo 3 caracteres.")
    .isLength({ max: 50 }).withMessage("O campo nome precisa ter no máximo 50 caracteres."),

  check("matriculaId")
    .notEmpty().trim().withMessage("O campo código de matrícula é obrigatório.")
    .isNumeric().withMessage("O campo código de matrícula só pode ter números.")
    .isLength({ min: 5, max: 5 }).withMessage("Informe um número de matrícula com 5 dígitos."),

  check("unidadeId")
    .notEmpty().trim().withMessage("O campo código da unidade é obrigatório.")
    .matches(/^\d+\s-\s[A-Za-z\s]+$/).withMessage("O campo código de unidade precisa estar no formato correto."),

  check("titulacao")
    .notEmpty().trim().withMessage("O campo titulação é obrigatório.")
    .isIn(["Especialista", "Mestre", "Mestra", "Doutor", "Doutora", "Pós-Doutor", "Pós-Doutora"]).withMessage("Informe uma titulação existente."),

  check("referencia")
    .notEmpty().trim().withMessage("O campo referencia é obrigatório.")
    .isLength({ min: 9, max: 11 }).withMessage("O campo referência precisa ter entre 9 e 11 caracteres.")
    .matches(/^PES\s(I|II|III)\s-\s[A-H]$/).withMessage("O campo referencia precisa estar no formato correto."),

  check("lattes")
    .notEmpty().trim().withMessage("O campo lattes é obrigatório.")
    .isURL().withMessage("O campo lattes precisa ser uma url válida."),

  check("coursesId")
    .notEmpty().trim().isArray({ min: 1 }).withMessage("É necessário fornecer pelo menos um curso."),

  check("email")
    .notEmpty().trim().withMessage("O campo email é obrigatório.")
    .isEmail().withMessage("O campo precisa ser um e-mail válido."),

  check("statusAtividade")
    .optional().trim().default("Ativo").isIn(["Ativo", "Inativo"]).withMessage('O campo só recebe "Ativo" ou "Inativo."'),

  check("notes")
    .optional().trim().default("Não há observações.")
    .isLength({ max: 40 }).withMessage("A observação não pode passar de 40 caracteres."),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { coursesId, matriculaId } = req.body;

    try {
      // Validação da existência do(s) curso(s) no DB
      if (!await checkCourseExistence(coursesId)) {
        return res.status(400).send({ err: "Todos cursos precisam existir na base de dados, algum coursesId inválido" });
      }

      // Validar matriculaId
      const professorExists = await professorService.checkMatriculaIdExistenceService(matriculaId);
      if (professorExists) {
        return res.status(400).send({err: "Já existe um professor com esse número de matrícula."});
      }

      req.infos = req.body;
      next();
    } catch (err) {
      return res.status(500).send({ err: err.message });
    }
  },
];

// Middleware de validação de ID
const ValidId = [
  async (req, res, next) => {
    let ids = req.params.id;
    ids = ids.split(",");

    for (let id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ err: `O ID ${id} não é válido` });
      }
    }

    if (!await checkCourseExistence(ids)) {
      return res.status(400).send({ err: "Todos cursos precisam existir na base de dados, algum coursesId inválido" });
    }

    req.coursesId = ids; // Caso seja um curso
    req.id = ids; // Caso seja um professor

    next();
  },
];

// Middleware de validação de busca de curso
const ValidSearchCourse = [
  async (req, res, next) => {
    const coursesId = req.params.courseId;

    const registeredCourses = await courseService.findCoursesByIdService(coursesId);

    // Validação da existência do(s) curso(s) no DB
    if (!await checkCourseExistence(coursesId)) {
      return res.status(400).send({ err: "Todos cursos precisam existir na base de dados, algum coursesId inválido" });
    }

    req.coursesId = coursesId;
    req.registeredCourses = registeredCourses;

    next();
  },
];

export {
  ValidRegisteredProfessors,
  ValidForm,
  ValidId,
  ValidSearchCourse,
};

// Função para verificar a existência do número de matrícula
const checkMatriculaIdExistenceService = async (matriculaId) => {
  try {
    const professor = await professorModel.findOne({ matriculaId: matriculaId });
    return professor !== null;
  } catch (err) {
    throw new Error('Erro ao verificar existência da matrícula: ' + err.message);
  }
};
