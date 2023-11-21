"use strict";

import express from 'express';

import { protect } from '../middlewares/verifyToken.js';

import {
  sendMessage,
  allMessages
} from '../controllers/messageGroup.controller.js';

const router = express.Router();

router.use(protect);

router.post('', sendMessage);
router.get('/:chatId', allMessages);


export default router; 