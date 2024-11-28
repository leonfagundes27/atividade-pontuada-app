import { check, validationResult } from 'express-validator';
import courseService from '../services/course.service.js';
import mongoose from 'mongoose';

const ValidForm = [
  check('nome')
    .notEmpty().trim().withMessage('O campo nome é obrigatório.')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s~]+$/).withMessage("O campo nome só pode ter letras, espaços e caracteres acentuados.")
    .isLength({min: 3}).withMessage('O campo nome precisa ter no mínimo 3 letras.'),

  check('codCourse')
    .notEmpty().trim().withMessage('O campo código do curso é obrigatório.')
    .isNumeric().withMessage('O campo código do curso só pode ter números.')
    .isLength({ min: 3, max:5 }).withMessage('Informe um código de curso de 3 a 5 dígitos.'),

  check('sigla')
    .notEmpty().trim().withMessage('O campo sigla é obrigatório.')
    .isAlpha().withMessage('O campo sigla precisa ter apenas letras.')
    .isLength({min: 2, max: 4}).withMessage("Informe uma sigla de 2 a 4 letras."),

  check('modalidade')
    .notEmpty().withMessage('O campo modalidade é obrigatório.')
    .isIn(["Presencial", "EAD", "Híbrido"]).withMessage('O campo modalidade precisa ser EAD, Presencial ou Híbrido.'),

  check('disciplinas')
    .notEmpty().withMessage('O campo disciplinas é obrigatório.')
    .isArray({ min: 1 }).withMessage('É necessário cadastrar pelo menos uma disciplina.'),

  check('coordenador')
    .optional()
    .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('Coordenador inválido.');
        }
        return true;
      }),

  async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    req.infos = req.body;
    next();
  }
];

const ValidSearchCourse = async (req, res, next) => {
  try {
    const courses = await courseService.findAllCoursesService();

    if (!courses || courses.length === 0) {
      return res.status(400).send({ msg: "Não há cursos cadastrados" });
    }

    req.courses = courses;
    next();
  } catch (err) {
    res.status(500).send({err: "Erro ao buscar professor"});
  }
};

const ValidIdCourse = [
  async (req, res, next) => {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send({ err: `O ID '${courseId}' não é válido` });
    }

    const course = await courseService.findCourseByIdService(courseId);

    if (!course) {
      return res.status(404).send({ err: "Curso não encontrado" });
    }

    req.course = course;
    req.courseId = courseId;
    next();
  }
];


const checkCourseExistence = async (coursesId) => {
  if (!Array.isArray(coursesId)) {
    coursesId = [coursesId];
  }

  const registeredCourses = await courseService.findCoursesByIdService(coursesId);

  return registeredCourses && registeredCourses.length === coursesId.length;
};

export {
  ValidForm,
  ValidSearchCourse,
  ValidIdCourse,
  checkCourseExistence
};
