import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Tag, User, FolderTree, ArrowRight, Loader2 } from 'lucide-react';
import { RegistrationData, RegistrationOptions } from '../../types/registration';
import { getCategorias, getVendedores } from '../../services/api';

interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<RegistrationOptions>({
    categorias: [],
    vendedores: [],
  });
  
  const [data, setData] = useState<RegistrationData>({
    estructura: '',
    serie: '',
    id_categoria: null,
    id_vendedor: null,
    cliente: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});

  // Cargar categorías y vendedores desde el API
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [categoriasRes, vendedoresRes] = await Promise.all([
          getCategorias(),
          getVendedores(),
        ]);

        if (categoriasRes.success && categoriasRes.data) {
          setOptions(prev => ({ ...prev, categorias: categoriasRes.data! }));
        }
        if (vendedoresRes.success && vendedoresRes.data) {
          setOptions(prev => ({ ...prev, vendedores: vendedoresRes.data! }));
        }
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    let isValid = true;

    // Validar campos requeridos
    if (!data.estructura.trim()) {
      newErrors.estructura = 'Este campo es requerido';
      isValid = false;
    }
    if (!data.serie.trim()) {
      newErrors.serie = 'Este campo es requerido';
      isValid = false;
    }
    if (!data.cliente.trim()) {
      newErrors.cliente = 'Este campo es requerido';
      isValid = false;
    }
    if (!data.id_categoria) {
      newErrors.id_categoria = 'Seleccione una categoría';
      isValid = false;
    }
    if (!data.id_vendedor) {
      newErrors.id_vendedor = 'Seleccione un vendedor';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete(data);
    }
  };

  const handleChange = (field: keyof RegistrationData, value: string | number | null) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md flex items-center justify-center"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 shadow-2xl flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          <p className="text-slate-400 text-sm">Cargando opciones...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Registro de Unidad</h2>
          <p className="text-slate-400 text-sm">Ingrese los datos del proyecto para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Estructura */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Structure ID
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={data.estructura}
                onChange={(e) => handleChange('estructura', e.target.value)}
                placeholder="Ej: STR-2024-001"
                className={`w-full bg-slate-950 border rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.estructura ? 'border-red-500' : 'border-slate-800'
                }`}
              />
            </div>
            {errors.estructura && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.estructura}
              </motion.p>
            )}
          </div>

          {/* Serie */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Serie
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={data.serie}
                onChange={(e) => handleChange('serie', e.target.value)}
                placeholder="Ej: Heavy Duty X1"
                className={`w-full bg-slate-950 border rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.serie ? 'border-red-500' : 'border-slate-800'
                }`}
              />
            </div>
            {errors.serie && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.serie}
              </motion.p>
            )}
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Cliente
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={data.cliente}
                onChange={(e) => handleChange('cliente', e.target.value)}
                placeholder="Ej: Minera ABC"
                className={`w-full bg-slate-950 border rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.cliente ? 'border-red-500' : 'border-slate-800'
                }`}
              />
            </div>
            {errors.cliente && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.cliente}
              </motion.p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Categoría
            </label>
            <div className="relative">
              <FolderTree className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select
                value={data.id_categoria || ''}
                onChange={(e) => handleChange('id_categoria', e.target.value ? Number(e.target.value) : null)}
                className={`w-full bg-slate-950 border rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none ${
                  errors.id_categoria ? 'border-red-500' : 'border-slate-800'
                }`}
              >
                <option value="">Seleccionar categoría...</option>
                {options.categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            {errors.id_categoria && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.id_categoria}
              </motion.p>
            )}
          </div>

          {/* Vendedor */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Vendedor
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select
                value={data.id_vendedor || ''}
                onChange={(e) => handleChange('id_vendedor', e.target.value ? Number(e.target.value) : null)}
                className={`w-full bg-slate-950 border rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none ${
                  errors.id_vendedor ? 'border-red-500' : 'border-slate-800'
                }`}
              >
                <option value="">Seleccionar vendedor...</option>
                {options.vendedores.map((vend) => (
                  <option key={vend.id} value={vend.id}>
                    {vend.nombre}
                  </option>
                ))}
              </select>
            </div>
            {errors.id_vendedor && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.id_vendedor}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors mt-6"
          >
            <span>Iniciar Configuración</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
