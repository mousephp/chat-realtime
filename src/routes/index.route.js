"use strict";

import express from 'express';

import authRoutes from './auth.route.js';

import conversationRoutes from './conversation.route.js';

import messageRoutes from './message.route.js';

import messageGroupRoutes from './messageGroup.route.js';

import groupRoutes from './group.route.js';

import userRoutes from './user.route.js';

import _userRoutes from './_user.route.js';

import { incr, expire, ttl } from '../utils/limiter.js';

const router = express.Router();


router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

router.use('/conversation', conversationRoutes);

router.use('/message', messageRoutes);

router.use('/message-group', messageGroupRoutes);

router.use('/chat', groupRoutes);

router.use('/user', userRoutes);

router.use('/_user', _userRoutes);

export default router
