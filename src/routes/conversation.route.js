"use strict";

import express from 'express';

import { protect } from '../middlewares/verifyToken.js';

import {
  createConversation,
  deleteConversation,
  getAllConversations,
  getOrCreateConversation,
  updateConversation
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.use(protect);

router
  .route('')
  .get(getAllConversations)
  .post(createConversation)
  .patch(getOrCreateConversation);

router.route('/:id').patch(updateConversation).delete(deleteConversation);


export default router;