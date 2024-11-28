import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middleware/auth.middleware.js'

import {
    findAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    filterCourse
} from '../controller/course.controller.js';

import {
    ValidForm,
    ValidSearchCourse,
    ValidIdCourse,
} from '../middleware/course.middleware.js';

// Busca todos os cursos
router.get('/', ValidSearchCourse, findAllCourses);

//Filtra curso
router.get('/filter', filterCourse);

// Cadastra um novo curso
router.post('/', authMiddleware, ValidForm, createCourse);

// Atualiza os dados de algum curso
router.put('/:id', ValidIdCourse, ValidForm, updateCourse);

// Remove um curso da base de dados
router.delete('/:id', ValidIdCourse, deleteCourse);


export default router;