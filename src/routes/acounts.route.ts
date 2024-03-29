import express from 'express';
import { login, register, logout } from '../controllers/accounts.controller.js';


const router = express.Router();

router.post("/auth/login", login);

router.post("/auth/register", register);

router.get("/auth/logout", logout);

export default router;
