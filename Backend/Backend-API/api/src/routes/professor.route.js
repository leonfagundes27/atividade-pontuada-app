import { Router } from 'express';
const router = Router();

import {
    findAll,
    findByName,
    findProfessorByCourse,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    filterProfessor
} from '../controller/professor.controller.js'

import {
    ValidRegisteredProfessors,
    ValidForm,
    ValidId,
    ValidSearchCourse
} from'../middleware/professor.middlewares.js';


// Busca todos os professores
router.get('/', ValidRegisteredProfessors, findAll);

//Filtra professor
router.get('/filter', filterProfessor)

// Busca os professores pelo nome
router.get('/:nome', findByName);

// Busca professor pelos cursos selecionados
router.get('/:courseId', ValidId, ValidSearchCourse, findProfessorByCourse);

// Cria um professor
router.post('/', ValidForm, createProfessor);

// Atualiza os dados de um professor
router.put('/:id', ValidId, ValidForm, updateProfessor);

// Deleta um professor
router.delete('/:id', ValidId, deleteProfessor);

export default router;