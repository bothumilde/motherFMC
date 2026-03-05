import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/areas - Obtener todas las áreas
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('id, nombre')
      .order('id');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});

export default router;

