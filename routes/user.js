/* eslint-disable import/extensions */
import { Router } from 'express';
import authenticateToken from '../middleware/session.js';

import {  signup, login } from '../controller/user.js';

const userRoutes = Router();

userRoutes.post('/signup', signup);

userRoutes.post('/login', authenticateToken, login);

export default userRoutes;
