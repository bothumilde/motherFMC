import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/capacidad - Obtener capacidad (opcional: ?tipo=remolque/semi)
router.get('/capacidad', async (req: Request, res: Response) => {
  try {
    const tipo = req.query.tipo;

    let query = supabase
      .from('capacidad')
      .select('id, nombre, tipo')
      .order('nombre');

    if (tipo) {
      query = query.eq('tipo', tipo as string);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching capacidad:', error);
    res.status(500).json({ error: 'Failed to fetch capacidad' });
  }
});

// GET /api/chasis
router.get('/chasis', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('chasis')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching chassis:', error);
    res.status(500).json({ error: 'Failed to fetch chassis' });
  }
});

// GET /api/compuerta
router.get('/compuerta', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('compuerta')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching compuerta:', error);
    res.status(500).json({ error: 'Failed to fetch compuerta' });
  }
});

// GET /api/ejes
router.get('/ejes', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('ejes')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching ejes:', error);
    res.status(500).json({ error: 'Failed to fetch ejes' });
  }
});

// GET /api/piso
router.get('/piso', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('piso')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching piso:', error);
    res.status(500).json({ error: 'Failed to fetch piso' });
  }
});

// GET /api/suspension
router.get('/suspension', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('suspension')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching suspension:', error);
    res.status(500).json({ error: 'Failed to fetch suspension' });
  }
});

// GET /api/trocha
router.get('/trocha', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('trocha')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching trocha:', error);
    res.status(500).json({ error: 'Failed to fetch trocha' });
  }
});

// GET /api/llanta
router.get('/llanta', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('llanta')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching llanta:', error);
    res.status(500).json({ error: 'Failed to fetch llanta' });
  }
});

// GET /api/bocamaza
router.get('/bocamaza', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('bocamaza')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching bocamaza:', error);
    res.status(500).json({ error: 'Failed to fetch bocamaza' });
  }
});

// GET /api/muelles
router.get('/muelles', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('muelles')
      .select('id, nombre')
      .order('nombre');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching muelles:', error);
    res.status(500).json({ error: 'Failed to fetch muelles' });
  }
});

export default router;

