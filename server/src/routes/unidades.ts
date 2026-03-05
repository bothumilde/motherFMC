import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/unidades - Obtener todas las unidades registradas
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('vw_detalle_unidades')
      .select('*')
      .order('fecha_registro', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching unidades:', error);
    res.status(500).json({ error: 'Failed to fetch unidades' });
  }
});

// POST /api/unidades - Registrar una nueva unidad
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      estructura,
      serie,
      id_categoria,
      id_subcategoria,
      cliente,
      id_vendedor,
      c_respuestas
    } = req.body;

    // Validar campos requeridos
    if (!estructura || !serie || !cliente) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['estructura', 'serie', 'cliente']
      });
    }

    // Insertar en la tabla unidades
    const { data, error } = await supabase
      .from('unidades')
      .insert({
        estructura,
        serie,
        id_categoria: id_categoria || null,
        id_subcategoria: id_subcategoria || null,
        cliente,
        id_vendedor: id_vendedor || null,
        c_respuestas: c_respuestas || {}
      })
      .select()
      .single();

    if (error) throw error;

    // Obtener el detalle de la unidad registrada
    const { data: detalle, error: detalleError } = await supabase
      .from('vw_detalle_unidades')
      .select('*')
      .eq('id_registro', data.id)
      .single();

    if (detalleError) {
      console.warn('Could not fetch detalle:', detalleError);
    }

    res.status(201).json(detalle || data);
  } catch (error) {
    console.error('Error registering unidad:', error);
    res.status(500).json({ error: 'Failed to register unidad' });
  }
});

export default router;

