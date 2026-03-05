"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const supabase_js_1 = require("./config/supabase.js");
const areas_js_1 = __importDefault(require("./routes/areas.js"));
const categorias_js_1 = __importDefault(require("./routes/categorias.js"));
const vendedores_js_1 = __importDefault(require("./routes/vendedores.js"));
const reglas_js_1 = __importDefault(require("./routes/reglas.js"));
const unidades_js_1 = __importDefault(require("./routes/unidades.js"));
const referencia_js_1 = __importDefault(require("./routes/referencia.js"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Orígenes permitidos (prod + opcionalmente dev)
const allowedOrigins = [
    process.env.FRONTEND_URL, // ej: https://motherfmc-....azurewebsites.net (configurado en Azure)
    'http://localhost:5173', // quitar si no quieres permitir dev local
].filter(Boolean);
app.use((0, cors_1.default)({
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
}));
app.use(express_1.default.json());
// Verificar configuración de Supabase al iniciar
(0, supabase_js_1.checkSupabaseConfig)();
// Rutas API
app.use('/api/areas', areas_js_1.default);
app.use('/api/categorias', categorias_js_1.default);
app.use('/api/vendedores', vendedores_js_1.default);
app.use('/api/reglas', reglas_js_1.default);
app.use('/api/unidades', unidades_js_1.default);
app.use('/api', referencia_js_1.default);
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
const staticPath = path_1.default.join(__dirname, '..', '..', 'dist');
app.use(express_1.default.static(staticPath));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(staticPath, 'index.html'));
});
// Manejo de errores
app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});
exports.default = app;
