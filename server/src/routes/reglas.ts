import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/reglas?id_categoria=1 - Obtener reglas por categoría
router.get('/', async (req: Request, res: Response) => {
  try {
    const idCategoria = req.query.id_categoria;

    if (!idCategoria) {
      return res.status(400).json({ error: 'id_categoria is required' });
    }

    const { data, error } = await supabase
      .from('reglas')
      .select('id, id_categoria, tipo_js, campo_nombre, tabla_referencia, filtro_tipo, orden_visualizacion')
      .eq('id_categoria', parseInt(idCategoria as string))
      .order('orden_visualizacion');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching reglas:', error);
    res.status(500).json({ error: 'Failed to fetch reglas' });
  }
});

export default router;

