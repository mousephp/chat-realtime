"use strict";

import express from 'express';

import { protect } from '../middlewares/verifyToken.js';

import {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} from '../controllers/group.controller.js';

const router = express.Router();

router.use(protect);

router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

export default router;

