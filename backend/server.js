import express, { json } from 'express';
import dotenv from 'dotenv';

import { errors } from 'celebrate';
import { celebrate, Joi } from 'celebrate';
import { validateURL, validateEmail, validatePassword } from './utils/validators.js';

import cors from "cors";

import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import auth from './middleware/auth.js';
import cardRoutes from './routes/cardRoutes.js';

import { errorMiddleware, notFoundError } from './middleware/errorMiddleware.js';

import { requestLogger, errorLogger, initLogs } from './utils/logger.js';

initLogs();

dotenv.config();
const app = express();

app.use(json());
app.use(cors());

app.use(requestLogger);

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

app.use(notFoundError);
app.use(errorMiddleware);

app.get("/", (req,res) =>{
    console.log("Middleware funciono")
});

app.get("/api/protegida" , auth, (req, res) => {
    res.send(`User with id  ${req.user.userId} is authenticated`);
});

app.use(errors());

app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`)
});