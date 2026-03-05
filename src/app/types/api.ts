// Tipos para el API que reflejan la estructura de tu base de datos PostgreSQL

// === TABLAS DE REFERENCIA ===

export interface Area {
  id: number;
  nombre: string;
}

export interface Capacidad {
  id: number;
  nombre: string;
  tipo: string;
}

export interface Chasis {
  id: number;
  nombre: string;
}

export interface Compuerta {
  id: number;
  nombre: string;
}

export interface Ejes {
  id: number;
  nombre: string;
}

export interface Llanta {
  id: number;
  nombre: string;
}

export interface Muelles {
  id: number;
  nombre: string;
}

export interface Piso {
  id: number;
  nombre: string;
}

export interface Suspension {
  id: number;
  nombre: string;
}

export interface Trocha {
  id: number;
  nombre: string;
}

export interface Bocamaza {
  id: number;
  nombre: string;
}

export interface Vendedor {
  id: number;
  nombre: string;
}

// === CATEGORÍAS Y SUBCATEGORÍAS ===

export interface Categoria {
  id: number;
  id_area: number;
  nombre: string;
}

export interface Subcategoria {
  id: number;
  id_categoria: number;
  nombre: string;
}

// === REGLAS DE CONFIGURACIÓN ===

export type TipoControl = 'SELECT' | 'NUMBER' | 'TEXT' | 'CHECKBOX' | 'RADIO';

export interface Regla {
  id: number;
  id_categoria: number;
  tipo_js: TipoControl;
  campo_nombre: string;
  tabla_referencia: string | null;
  filtro_tipo: string | null;
  orden_visualizacion: number;
}

// === OPCIONES DINÁMICAS PARA SELECTS ===

export interface OpcionSelect {
  id: number | string;
  nombre: string;
  tipo?: string; // Para capacidad que tiene tipo
}

// === REGISTRO DE UNIDADES ===

export interface UnidadRegistration {
  estructura: string;
  serie: string;
  id_categoria: number | null;
  id_subcategoria: number | null;
  cliente: string;
  id_vendedor: number | null;
  c_respuestas: Record<string, unknown>;
}

// === RESPUESTAS API ===

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ReglaConOpciones extends Regla {
  opciones: OpcionSelect[] | null;
}

// === VIEW VW_DETALLE_UNIDADES ===

export interface DetalleUnidad {
  id_registro: number;
  fecha_registro: string;
  estructura: string;
  serie: string;
  categoria: string;
  subcategoria: string | null;
  cliente: string;
  vendedor: string;
  configuracion_tecnica: Record<string, unknown>;
}
