"use strict";

import express from 'express';

import { protect } from '../middlewares/verifyToken.js';

import {
  createMessage,
  deleteMessages,
  getMessagesByConversation,
  allMessages
} from '../controllers/message.controller.js';

const router = express.Router();

//globle - middle
router.use(protect);

router.post('', createMessage);
router.get('/:conversationId', getMessagesByConversation);
router.delete('/:id', deleteMessages);

router.get('/', allMessages);


export default router;