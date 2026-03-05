import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/vendedores - Obtener todos los vendedores
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('vendedores')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching vendedores:', error);
    res.status(500).json({ error: 'Failed to fetch vendedores' });
  }
});

export default router;

