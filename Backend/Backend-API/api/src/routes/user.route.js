import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router();

import {
    createUser,
    findAllUsers,
} from '../controller/user.controller.js';

import {
    validateForm, 
    validateRegisteredUsers  
} from '../middleware/user.middleware.js';

// Cria um novo usuário
router.post('/', validateForm, createUser);

// Busca todos os usuários cadastrados
router.get('/', authMiddleware, validateRegisteredUsers, findAllUsers);

export default router;
