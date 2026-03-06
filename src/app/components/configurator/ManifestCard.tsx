import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Info, Trash2, Package, Truck, Ruler, Settings, Gauge, Anchor, CircleDot, Layers, Cog } from 'lucide-react';
import { ReglaConOpciones } from '../../types/api';
import { RegistrationData } from '../../types/registration';
import { DynamicConfigState } from '../../hooks/useDynamicConfiguration';

interface ManifestCardProps {
  config: DynamicConfigState;
  reglas: ReglaConOpciones[];
  onClear: () => void;
  registrationData: RegistrationData;
}

// Mapeo de iconos según el nombre del campo
const getIconForCampo = (campoNombre: string) => {
  const lowerCampo = campoNombre.toLowerCase();
  
  if (lowerCampo.includes('capacidad') || lowerCampo.includes('volumen')) return Gauge;
  if (lowerCampo.includes('chasis')) return Truck;
  if (lowerCampo.includes('compuerta') || lowerCampo.includes('puerta')) return Settings;
  if (lowerCampo.includes('eje')) return Ruler;
  if (lowerCampo.includes('piso')) return Layers;
  if (lowerCampo.includes('suspensión') || lowerCampo.includes('suspension')) return Anchor;
  if (lowerCampo.includes('trocha')) return CircleDot;
  if (lowerCampo.includes('llanta') || lowerCampo.includes('rueda')) return Package;
  if (lowerCampo.includes('bocamaza')) return Cog;
  if (lowerCampo.includes('muelle')) return Anchor;
  if (lowerCampo.includes('longitud') || lowerCampo.includes('largo')) return Ruler;
  if (lowerCampo.includes('compartimiento')) return Package;
  
  return Package;
};

// Colores según el tipo de campo
const getColorForCampo = (campoNombre: string): string => {
  const lowerCampo = campoNombre.toLowerCase();
  
  if (lowerCampo.includes('capacidad')) return 'text-purple-500';
  if (lowerCampo.includes('chasis')) return 'text-blue-500';
  if (lowerCampo.includes('compuerta')) return 'text-emerald-500';
  if (lowerCampo.includes('eje')) return 'text-cyan-500';
  if (lowerCampo.includes('piso')) return 'text-amber-500';
  if (lowerCampo.includes('suspensión') || lowerCampo.includes('suspension')) return 'text-rose-500';
  if (lowerCampo.includes('trocha')) return 'text-orange-500';
  if (lowerCampo.includes('llanta')) return 'text-slate-400';
  if (lowerCampo.includes('bocamaza')) return 'text-zinc-500';
  if (lowerCampo.includes('muelle')) return 'text-indigo-500';
  
  return 'text-cyan-500';
};

export const ManifestCard: React.FC<ManifestCardProps> = ({ 
  config, 
  reglas,
  onClear,
  registrationData 
}) => {
  const progress = Object.values(config).filter(v => v !== null).length;
  const total = reglas.length;

  // Ordenar reglas por orden_visualizacion
  const reglasOrdenadas = [...reglas].sort((a, b) => a.orden_visualizacion - b.orden_visualizacion);

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-end mb-4 px-2">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <FileText className="w-4 h-4" /> Ficha de proyecto
        </h2>
        <button 
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-opacity disabled:hidden"
          disabled={progress === 0}
        >
          <Trash2 className="w-3 h-3" /> Limpiar
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative min-h-[400px]">
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
        
        {/* Encabezado con datos del registro */}
        <div className="bg-slate-950/50 border-b border-slate-800 px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] uppercase tracking-wider text-slate-500">
          <div className="truncate">
            <span className="block font-bold text-slate-400 mb-0.5">Estructura</span>
            <span className="truncate">{registrationData.estructura}</span>
          </div>
          <div className="truncate">
            <span className="block font-bold text-slate-400 mb-0.5">Serie</span>
            <span className="truncate">{registrationData.serie}</span>
          </div>
          <div className="truncate">
            <span className="block font-bold text-slate-400 mb-0.5">Cliente</span>
            <span className="truncate">{registrationData.cliente}</span>
          </div>
          <div className="truncate">
            <span className="block font-bold text-slate-400 mb-0.5">Progreso</span>
            <span className="truncate">{progress}/{total}</span>
          </div>
        </div>

        <div className="p-8 grid gap-6 relative z-10">
          <AnimatePresence>
            {progress === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-0 opacity-30 pointer-events-none"
              >
                <Package className="w-16 h-16 text-slate-700 mb-4 stroke-1" />
                <p className="text-slate-500 font-mono text-sm">Esperando atributos</p>
                <p className="text-slate-600 text-xs mt-2 max-w-xs">Selecciona los atributos de la unidad según la OP</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid de configuración dinámica - 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reglasOrdenadas.map((regla) => (
              <ConfigSection 
                key={regla.id}
                regla={regla}
                value={config[regla.campo_nombre]}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-slate-950 select-none pointer-events-none z-[-1] opacity-50 rotate-[-15deg]">
            SPEC
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-slate-500 text-xs max-w-lg mx-auto text-center">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>Selecciona los atributos de la unidad. Una vez completo procede a revisar.</p>
      </div>
    </div>
  );
};

interface ConfigSectionProps {
  regla: ReglaConOpciones;
  value: string | number | null;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ regla, value }) => {
  const Icon = getIconForCampo(regla.campo_nombre);
  const colorClass = getColorForCampo(regla.campo_nombre);
  
  // Obtener el nombre seleccionado si es un SELECT
  const selectedLabel = React.useMemo(() => {
    if (value === null) return null;
    
    if (regla.tipo_js === 'SELECT' && regla.opciones) {
      const opcion = regla.opciones.find(o => String(o.id) === String(value));
      return opcion?.nombre || String(value);
    }
    
    // Para NUMBER o TEXT, mostrar el valor directamente
    return String(value);
  }, [value, regla]);

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {regla.campo_nombre}
      </label>
      {value !== null && selectedLabel ? (
        <motion.div 
          layoutId={`manifest-${regla.campo_nombre.toLowerCase()}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-3 bg-slate-950/50 rounded border border-slate-800"
        >
          <Icon className={`w-5 h-5 ${colorClass} mt-0.5`} />
          <div>
            <div className="text-white font-mono font-bold text-lg">
              {selectedLabel}
            </div>
            <div className="text-xs text-slate-500">
              {regla.tipo_js === 'NUMBER' ? 'Valor numérico' : 'Opción seleccionada'}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="h-16 border-2 border-dashed border-slate-800 rounded flex items-center justify-center text-slate-700 text-xs font-mono uppercase">
          Vacío
        </div>
      )}
    </div>
  );
};
