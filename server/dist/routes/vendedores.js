"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("../config/supabase.js");
const router = (0, express_1.Router)();
// GET /api/vendedores - Obtener todos los vendedores
router.get('/', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('vendedores')
            .select('id, nombre')
            .order('nombre');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching vendedores:', error);
        res.status(500).json({ error: 'Failed to fetch vendedores' });
    }
});
exports.default = router;
