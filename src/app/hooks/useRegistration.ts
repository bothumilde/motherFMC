import { useState, useCallback } from 'react';
import { RegistrationData } from '../types/registration';

const initialData: RegistrationData = {
    estructura: '',
    serie: '',
    id_categoria: null,
    id_vendedor: null,
    cliente: '',
};

export function useRegistration() {
  const [data, setData] = useState<RegistrationData>(initialData);
  const [isComplete, setIsComplete] = useState(false);

  const updateField = useCallback(<K extends keyof RegistrationData>(
    field: K,
    value: RegistrationData[K]
  ) => {
    setData(prev => {
      const newData = { ...prev, [field]: value };
      
      // SOLUCIÓN AL ERROR TS18047 y TS2339:
      // Convertimos cada valor a String y verificamos que no esté vacío
      const complete = Object.values(newData).every(v => {
        return v !== null && v !== undefined && String(v).trim() !== '';
      });

      setIsComplete(complete);
      return newData;
    });
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setIsComplete(false);
  }, []);

  const submit = useCallback(() => {
    if (isComplete) {
      return data;
    }
    return null;
  }, [data, isComplete]);

  return {
    data,
    isComplete,
    updateField,
    reset,
    submit,
  };
}