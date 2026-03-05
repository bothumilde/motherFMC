"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("../config/supabase.js");
const router = (0, express_1.Router)();
// GET /api/categorias - Obtener todas las categorías
// GET /api/categorias?area=1 - Obtener categorías por área
router.get('/', async (req, res) => {
    try {
        const idArea = req.query.area;
        let query = supabase_js_1.supabase
            .from('categoria')
            .select('id, id_area, nombre')
            .order('id');
        if (idArea) {
            query = query.eq('id_area', parseInt(idArea));
        }
        const { data, error } = await query;
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching categoria:', error);
        res.status(500).json({ error: 'Failed to fetch categoria' });
    }
});
exports.default = router;
