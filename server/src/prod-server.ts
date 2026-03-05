import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

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

// Orígenes permitidos (prod + opcionalmente dev)
const allowedOrigins = [
  process.env.FRONTEND_URL,      // ej: https://motherfmc-....azurewebsites.net (configurado en Azure)
  'http://localhost:5173',       // quitar si no quieres permitir dev local
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests sin origin (curl, Postman, health checks, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.json());

// Verificar configuración de Supabase al iniciar
checkSupabaseConfig();

// Rutas API
app.use('/api/areas', areasRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/vendedores', vendedoresRouter);
app.use('/api/reglas', reglasRouter);
app.use('/api/unidades', unidadesRouter);
app.use('/api', referenciaRouter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const staticPath = path.join(__dirname, '..', '..', 'dist');
app.use(express.static(staticPath));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Manejo de errores
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});

export default app;