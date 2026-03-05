import React from 'react';
import { motion } from 'motion/react';
import { ReglaConOpciones } from '../../types/api';
import { DynamicConfigState } from '../../hooks/useDynamicConfiguration';

interface AttributeDockProps {
  reglas: ReglaConOpciones[];
  onSelect: (campoNombre: string, value: string | number | null) => void;
  config: DynamicConfigState;
}

// Colores por tipo de campo
const getCampoColor = (campoNombre: string): { border: string; bg: string; text: string } => {
  const lower = campoNombre.toLowerCase();
  
  if (lower.includes('capacidad')) {
    return { border: 'border-purple-500/30 hover:border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-500' };
  }
  if (lower.includes('chasis')) {
    return { border: 'border-blue-500/30 hover:border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-500' };
  }
  if (lower.includes('compuerta')) {
    return { border: 'border-emerald-500/30 hover:border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-500' };
  }
  if (lower.includes('eje')) {
    return { border: 'border-cyan-500/30 hover:border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-500' };
  }
  if (lower.includes('piso')) {
    return { border: 'border-amber-500/30 hover:border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-500' };
  }
  if (lower.includes('suspensión') || lower.includes('suspension')) {
    return { border: 'border-rose-500/30 hover:border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-500' };
  }
  if (lower.includes('trocha')) {
    return { border: 'border-orange-500/30 hover:border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500' };
  }
  if (lower.includes('llanta')) {
    return { border: 'border-slate-500/30 hover:border-slate-500', bg: 'bg-slate-500/10', text: 'text-slate-400' };
  }
  if (lower.includes('bocamaza')) {
    return { border: 'border-zinc-500/30 hover:border-zinc-500', bg: 'bg-zinc-500/10', text: 'text-zinc-500' };
  }
  if (lower.includes('muelle')) {
    return { border: 'border-indigo-500/30 hover:border-indigo-500', bg: 'bg-indigo-500/10', text: 'text-indigo-500' };
  }
  
  // Default colors for NUMBER fields
  return { border: 'border-cyan-500/30 hover:border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-500' };
};

export const AttributeDock: React.FC<AttributeDockProps> = ({ 
  reglas, 
  onSelect, 
  config 
}) => {
  // Ordenar reglas por orden_visualizacion
  const reglasOrdenadas = [...reglas].sort((a, b) => a.orden_visualizacion - b.orden_visualizacion);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 max-h-[50vh] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reglasOrdenadas.map((regla) => {
              const colors = getCampoColor(regla.campo_nombre);
              const selectedValue = config[regla.campo_nombre];
              
              return (
                <div key={regla.id} className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                    {regla.campo_nombre}
                  </span>
                  
                  {/* SELECT type */}
                  {regla.tipo_js === 'SELECT' && regla.opciones && (
                    <div className="flex gap-2 justify-center flex-wrap">
                      {regla.opciones.map((opcion) => {
                        const isSelected = String(selectedValue) === String(opcion.id);
                        
                        return (
                          <motion.button
                            key={opcion.id}
                            onClick={() => onSelect(regla.campo_nombre, isSelected ? null : String(opcion.id))}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              relative p-2 rounded-lg border-2 transition-all duration-200
                              flex flex-col items-center gap-1 min-w-[60px] text-xs
                              ${isSelected 
                                ? `${colors.bg} ${colors.border} ${colors.text}` 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                              }
                            `}
                          >
                            <span className="font-bold text-center">
                              {opcion.nombre}
                            </span>
                            {isSelected && (
                              <motion.div
                                layoutId={`indicator-${regla.campo_nombre}`}
                                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-current"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* NUMBER type */}
                  {regla.tipo_js === 'NUMBER' && (
                    <div className="flex gap-2 justify-center">
                      <input
                        type="number"
                        value={selectedValue as number || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            onSelect(regla.campo_nombre, null);
                          } else {
                            onSelect(regla.campo_nombre, Number(val));
                          }
                        }}
                        placeholder="Ingrese valor"
                        className={`
                          w-full bg-slate-950 border rounded-lg py-2 px-3 text-white text-center
                          placeholder-slate-600 focus:outline-none focus:ring-2 
                          ${selectedValue 
                            ? `${colors.border} ${colors.text}` 
                            : 'border-slate-800 focus:ring-cyan-500/50'
                          }
                        `}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
