import express from 'express';
import cors from 'cors';
import { welcomeRouter } from './routes/welcome.route.js';
import authRoute from './routes/auth.route.js';
import aiRoute from './routes/ai.route.js';
import notesRouter from './routes/note.route.js';
import articleRoute from './routes/article.route.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(welcomeRouter);
// Auth Route
app.use("/api/auth", authRoute);
// FastAPI Route
app.use("/api", aiRoute);
// CRUD Notes
app.use("/api/note", notesRouter);
// Article Route
app.use("/api/library", articleRoute);

export default app;