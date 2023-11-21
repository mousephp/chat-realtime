import express from 'express'

import dotenv from 'dotenv'

import errorController from './controllers/error.controller.js'

import path from 'path'

import morgan from 'morgan';

import cors from 'cors'

import corsOptions from './config/corsOptions.js';

import bodyParser from 'body-parser'

import helmet from "helmet";

import connectMongo from './config/mongo.config.js';


dotenv.config()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

connectMongo();

import routes from './routes/index.route.js'

app.use('/api', routes)

app.use('*', (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: 'Page not found!',
  });
});

app.use(errorController)

export default app;