import express from 'express';
import { homeMe } from '../controllers/home.controller';
import { authenticatedUser } from '../middleware/auth_user.middleware';

const protectedRoutes = express.Router();

protectedRoutes.use(authenticatedUser);

protectedRoutes.get('/me', homeMe);

export default protectedRoutes;
