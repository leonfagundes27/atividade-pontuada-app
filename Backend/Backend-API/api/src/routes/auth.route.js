import { Router } from 'express'
const router = Router();

import { loginController } from '../controller/auth.controller.js'

router.post('/', loginController)

export default router;