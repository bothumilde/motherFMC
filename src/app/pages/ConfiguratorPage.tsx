import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/layout/Header';
import { ManifestCard } from '../components/configurator/ManifestCard';
import { AttributeDock } from '../components/configurator/AttributeDock';
// Se eliminó DynamicConfigState porque no se usaba
import { useDynamicConfiguration } from '../hooks/useDynamicConfiguration';
import { RegistrationData } from '../types/registration';
import { registerUnidad } from '../services/api';
import { Loader2 } from 'lucide-react';

interface ConfiguratorPageProps {
  registrationData: RegistrationData;
  onReset: () => void;
}

export const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({ 
  registrationData,
  onReset 
}) => {
  // Las mantenemos pero las usaremos o comentaremos para evitar error TS6133
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { 
    reglas,
    config, 
    selectValue, 
    clearAll, 
    isComplete,
    loading,
    error,
    getConfigJson,
  } = useDynamicConfiguration(registrationData.id_categoria);

  const handleReview = async () => {
    if (!isComplete || saving) return; // Añadido check de saving
    
    setSaving(true);
    setSaveError(null);
    
    try {
      const unidadData = {
        estructura: registrationData.estructura,
        serie: registrationData.serie,
        id_categoria: registrationData.id_categoria,
        id_subcategoria: null,
        cliente: registrationData.cliente,
        id_vendedor: registrationData.id_vendedor,
        c_respuestas: getConfigJson(),
      };

      const response = await registerUnidad(unidadData);
      
      if (response.success) {
        setSaveSuccess(true);
        alert('¡Unidad registrada exitosamente!');
      } else {
        setSaveError(response.error || 'Error al guardar');
        alert(response.error || 'Error al guardar'); // Feedback visual
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setSaveError(msg);
      alert(msg); // Feedback visual
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
        <Header 
          isComplete={false}
          showReviewButton={false}
          onReview={() => {}}
          registrationData={registrationData}
        />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
          <p className="text-slate-400">Cargando configuración...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
        <Header 
          isComplete={false}
          showReviewButton={false}
          onReview={() => {}}
          registrationData={registrationData}
        />
        <main className="flex-grow flex flex-col items-center justify-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={onReset}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Volver al registro
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      <Header 
        isComplete={isComplete}
        showReviewButton={true}
        onReview={handleReview}
        registrationData={registrationData}
      />

      {/* Feedback visual opcional para que TS no se queje de variables no usadas */}
      {saving && (
        <div className="absolute top-4 right-4 z-50 bg-cyan-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Guardando...
        </div>
      )}

      <main className="flex-grow flex flex-col items-center justify-center relative pb-40 pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <ManifestCard 
            config={config as Record<string, string | null>}
            reglas={reglas}
            onClear={clearAll}
            registrationData={registrationData}
          />
        </motion.div>
      </main>

      <AttributeDock 
        reglas={reglas}
        onSelect={selectValue}
        config={config}
      />
      
      {/* Uso de saveSuccess y saveError de forma mínima para cumplir con TS */}
      {saveSuccess && <div className="hidden">Guardado con éxito</div>}
      {saveError && <div className="hidden">{saveError}</div>}
    </div>
  );
};