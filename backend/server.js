import 'dotenv/config'; import express from 'express'; import helmet from 'helmet'; import cors from 'cors'; import cookieParser from 'cookie-parser'; import mongoose from 'mongoose';
import { connectDB } from './config/db.js'; import routes from './routes/index.js';
const app = express(); app.use(helmet(), cors({ origin: process.env.CLIENT_URL, credentials: true }), express.json({ limit: '1mb' }), cookieParser());
app.use('/api/v1', routes); app.use((q, s) => s.status(404).json({ message: 'Route not found' }));
app.use((e, q, s, n) => { console.error(e.message); s.status(e.name === 'ValidationError' ? 422 : e.code === 11000 ? 409 : 500).json({ message: e.name === 'ValidationError' ? e.message : 'Something went wrong' }); });
await connectDB(); const srv = app.listen(process.env.PORT || 5000, () => console.log('API on', process.env.PORT || 5000));
process.on('SIGTERM', () => srv.close(() => mongoose.disconnect()));
