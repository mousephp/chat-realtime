"use strict";

import express from 'express';

import {
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  users
} from '../controllers/user.controller.js';

import { protect } from '../middlewares/verifyToken.js';

const router = express.Router();

//use global middleware
router.use(protect);

router.route('/index').get(getAllUsers);

router.route('/').delete(deleteAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.route('/').get(users)

export default router;