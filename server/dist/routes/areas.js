"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("../config/supabase.js");
const router = (0, express_1.Router)();
// GET /api/areas - Obtener todas las áreas
router.get('/', async (_req, res) => {
    try {
        const { data, error } = await supabase_js_1.supabase
            .from('areas')
            .select('id, nombre')
            .order('id');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ error: 'Failed to fetch areas' });
    }
});
exports.default = router;
