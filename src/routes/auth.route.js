"use strict";

import express from 'express';

import {
  forgotPassword,
  login,
  resetPassword,
  signup,
  updatePassword,
} from '../controllers/auth.controller.js';

import { protect } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/updatePassword', protect, updatePassword);

export default router;