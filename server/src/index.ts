import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { checkSupabaseConfig } from './config/supabase.js';
import areasRouter from './routes/areas.js';
import categoriasRouter from './routes/categorias.js';
import vendedoresRouter from './routes/vendedores.js';
import reglasRouter from './routes/reglas.js';
import unidadesRouter from './routes/unidades.js';
import referenciaRouter from './routes/referencia.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.json());

checkSupabaseConfig();