import {
  Categoria,
  Regla,
  OpcionSelect,
  UnidadRegistration,
  ApiResponse,
  DetalleUnidad,
  Area,
  Vendedor,
} from '../types/api';

// Use relative URL in production (served from same origin)
// Use environment variable for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper para hacer peticiones
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// === ÁREAS ===

export async function getAreas(): Promise<ApiResponse<Area[]>> {
  return fetchApi<Area[]>('/areas');
}

// === CATEGORÍAS ===

export async function getCategorias(): Promise<ApiResponse<Categoria[]>> {
  return fetchApi<Categoria[]>('/categorias');
}

export async function getCategoriasByArea(idArea: number): Promise<ApiResponse<Categoria[]>> {
  return fetchApi<Categoria[]>(`/categorias?area=${idArea}`);
}

// === VENDEDORES ===

export async function getVendedores(): Promise<ApiResponse<Vendedor[]>> {
  return fetchApi<Vendedor[]>('/vendedores');
}

// === REGLAS ===

export async function getReglasByCategoria(idCategoria: number): Promise<ApiResponse<Regla[]>> {
  return fetchApi<Regla[]>(`/reglas?id_categoria=${idCategoria}`);
}

// === TABLAS DE REFERENCIA (PARA SELECTS DINÁMICOS) ===

export async function getCapacidad(tipo?: string): Promise<ApiResponse<OpcionSelect[]>> {
  const endpoint = tipo ? `/capacidad?tipo=${tipo}` : '/capacidad';
  return fetchApi<OpcionSelect[]>(endpoint);
}

export async function getChasis(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/chasis');
}

export async function getCompuerta(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/compuerta');
}

export async function getEjes(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/ejes');
}

export async function getPiso(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/piso');
}

export async function getSuspension(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/suspension');
}

export async function getTrocha(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/trocha');
}

export async function getLlanta(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/llanta');
}

export async function getBocamaza(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/bocamaza');
}

export async function getMuelles(): Promise<ApiResponse<OpcionSelect[]>> {
  return fetchApi<OpcionSelect[]>('/muelles');
}

// Función genérica para obtener opciones según tabla de referencia
export async function getOpcionesByTabla(
  tablaReferencia: string,
  filtroTipo?: string | null
): Promise<OpcionSelect[]> {
  let opciones: OpcionSelect[] = [];
  
  // Mapeo de tablas a funciones
  switch (tablaReferencia.toLowerCase()) {
    case 'capacidad': {
      const response = await getCapacidad(filtroTipo || undefined);
      opciones = response.data || [];
      break;
    }
    case 'chasis': {
      const response = await getChasis();
      opciones = response.data || [];
      break;
    }
    case 'compuerta': {
      const response = await getCompuerta();
      opciones = response.data || [];
      break;
    }
    case 'ejes': {
      const response = await getEjes();
      opciones = response.data || [];
      break;
    }
    case 'piso': {
      const response = await getPiso();
      opciones = response.data || [];
      break;
    }
    case 'suspension': {
      const response = await getSuspension();
      opciones = response.data || [];
      break;
    }
    case 'trocha': {
      const response = await getTrocha();
      opciones = response.data || [];
      break;
    }
    case 'llanta': {
      const response = await getLlanta();
      opciones = response.data || [];
      break;
    }
    case 'bocamaza': {
      const response = await getBocamaza();
      opciones = response.data || [];
      break;
    }
    case 'muelles': {
      const response = await getMuelles();
      opciones = response.data || [];
      break;
    }
    default:
      console.warn(`Tabla de referencia desconocida: ${tablaReferencia}`);
  }

  return opciones;
}

// === REGISTRO DE UNIDADES ===

export async function registerUnidad(unidad: UnidadRegistration): Promise<ApiResponse<DetalleUnidad>> {
  return fetchApi<DetalleUnidad>('/unidades', {
    method: 'POST',
    body: JSON.stringify(unidad),
  });
}

// === OBTENER REGLAS CON OPCIONES ===

export interface ReglaConOpciones extends Regla {
  opciones: OpcionSelect[] | null;
}

export async function getReglasConOpciones(
  idCategoria: number
): Promise<ApiResponse<ReglaConOpciones[]>> {
  // Obtener las reglas base
  const reglasResponse = await getReglasByCategoria(idCategoria);
  
  if (!reglasResponse.success || !reglasResponse.data) {
    return { success: false, error: reglasResponse.error || 'Error fetching reglas' };
  }

  // Para cada regla, obtener las opciones si es SELECT
  const reglasConOpciones: ReglaConOpciones[] = await Promise.all(
    reglasResponse.data.map(async (regla) => {
      let opciones: OpcionSelect[] | null = null;

      if (regla.tipo_js === 'SELECT' && regla.tabla_referencia) {
        opciones = await getOpcionesByTabla(regla.tabla_referencia, regla.filtro_tipo);
      }

      return {
        ...regla,
        opciones,
      };
    })
  );

  // Ordenar por orden_visualizacion
  reglasConOpciones.sort((a, b) => a.orden_visualizacion - b.orden_visualizacion);

  return { success: true, data: reglasConOpciones };
}
