import { useState, useEffect, useCallback } from 'react';
import { ReglaConOpciones, OpcionSelect } from '../types/api';
import { getReglasConOpciones } from '../services/api';

// Estado de configuración dinámica
export interface DynamicConfigState {
  [campoNombre: string]: string | number | null;
}

// Hook para cargar y gestionar configuración dinámica basada en reglas del backend
export function useDynamicConfiguration(idCategoria: number | null) {
  const [reglas, setReglas] = useState<ReglaConOpciones[]>([]);
  const [config, setConfig] = useState<DynamicConfigState>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar reglas cuando cambia la categoría
  useEffect(() => {
    if (!idCategoria) {
      setReglas([]);
      setConfig({});
      return;
    }

    const loadRules = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getReglasConOpciones(idCategoria);
        
        if (response.success && response.data) {
          setReglas(response.data);
          // Inicializar el estado con valores nulos
          const initialConfig: DynamicConfigState = {};
          response.data.forEach((regla) => {
            initialConfig[regla.campo_nombre] = null;
          });
          setConfig(initialConfig);
        } else {
          setError(response.error || 'Error al cargar reglas');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadRules();
  }, [idCategoria]);

  // Seleccionar una opción de configuración
  const selectValue = useCallback((campoNombre: string, value: string | number | null) => {
    setConfig(prev => ({
      ...prev,
      [campoNombre]: prev[campoNombre] === value ? null : value,
    }));
  }, []);

  // Limpiar toda la configuración
  const clearAll = useCallback(() => {
    const emptyConfig: DynamicConfigState = {};
    reglas.forEach((regla) => {
      emptyConfig[regla.campo_nombre] = null;
    });
    setConfig(emptyConfig);
  }, [reglas]);

  // Calcular progreso
  const progress = Object.values(config).filter(v => v !== null).length;
  const total = reglas.length;
  const isComplete = total > 0 && progress === total;

  // Obtener configuración como JSON para guardar en la BD
  const getConfigJson = useCallback((): Record<string, unknown> => {
    return { ...config };
  }, [config]);

  // Obtener opciones para un campo específico
  const getOpcionesForCampo = useCallback((campoNombre: string): OpcionSelect[] => {
    const regla = reglas.find(r => r.campo_nombre === campoNombre);
    return regla?.opciones || [];
  }, [reglas]);

  // Obtener el tipo de control para un campo
  const getTipoControl = useCallback((campoNombre: string): string | null => {
    const regla = reglas.find(r => r.campo_nombre === campoNombre);
    return regla?.tipo_js || null;
  }, [reglas]);

  return {
    reglas,
    config,
    loading,
    error,
    selectValue,
    clearAll,
    progress,
    total,
    isComplete,
    getConfigJson,
    getOpcionesForCampo,
    getTipoControl,
  };
}
