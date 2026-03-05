"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("../config/supabase.js");
const router = (0, express_1.Router)();
// GET /api/capacidad - Obtener capacidad (opcional: ?tipo=remolque/semi)
router.get('/capacidad', async (req, res) => {
    try {
        const tipo = req.query.tipo;
        let query = supabase_js_1.supabase
            .from('capacidad')
            .select('id, nombre, tipo')
            .order('nombre');
        if (tipo) {
            query = query.eq('tipo', tipo);
        }
        const { data, error } = await query;
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching capacidad:', error);
        res.status(500).json({ error: 'Failed to fetch capacidad' });
    }
});
// GET /api/chasis
router.get('/chasis', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('chasis')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching chassis:', error);
        res.status(500).json({ error: 'Failed to fetch chassis' });
    }
});
// GET /api/compuerta
router.get('/compuerta', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('compuerta')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching compuerta:', error);
        res.status(500).json({ error: 'Failed to fetch compuerta' });
    }
});
// GET /api/ejes
router.get('/ejes', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('ejes')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching ejes:', error);
        res.status(500).json({ error: 'Failed to fetch ejes' });
    }
});
// GET /api/piso
router.get('/piso', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('piso')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching piso:', error);
        res.status(500).json({ error: 'Failed to fetch piso' });
    }
});
// GET /api/suspension
router.get('/suspension', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('suspension')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching suspension:', error);
        res.status(500).json({ error: 'Failed to fetch suspension' });
    }
});
// GET /api/trocha
router.get('/trocha', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('trocha')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching trocha:', error);
        res.status(500).json({ error: 'Failed to fetch trocha' });
    }
});
// GET /api/llanta
router.get('/llanta', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('llanta')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching llanta:', error);
        res.status(500).json({ error: 'Failed to fetch llanta' });
    }
});
// GET /api/bocamaza
router.get('/bocamaza', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('bocamaza')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching bocamaza:', error);
        res.status(500).json({ error: 'Failed to fetch bocamaza' });
    }
});
// GET /api/muelles
router.get('/muelles', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('muelles')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching muelles:', error);
        res.status(500).json({ error: 'Failed to fetch muelles' });
    }
});
exports.default = router;
