import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/categorias - Obtener todas las categorías
// GET /api/categorias?area=1 - Obtener categorías por área
router.get('/', async (req: Request, res: Response) => {
  try {
    const idArea = req.query.area;

    let query = supabase
      .from('categorias')
      .select('id, id_area, nombre')
      .order('id');

    if (idArea) {
      query = query.eq('id_area', parseInt(idArea as string));
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching categorias:', error);
    res.status(500).json({ error: 'Failed to fetch categorias' });
  }
});

export default router;

