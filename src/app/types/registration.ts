import { Categoria, Vendedor } from './api';

// Datos que vienen del formulario de registro
export interface RegistrationData {
  estructura: string;    // Structure ID - Campo: estructura
  serie: string;         // Series - Campo: serie
  id_categoria: number | null;  // Selected Category ID
  id_vendedor: number | null;   // Selected Seller ID
  cliente: string;       // Cliente
}

// Datos que se envían al backend
export interface RegistrationPayload {
  estructura: string;
  serie: string;
  id_categoria: number | null;
  id_subcategoria: number | null;
  cliente: string;
  id_vendedor: number | null;
  c_respuestas: Record<string, unknown>;
}

export interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void;
}

export type RegistrationField = keyof RegistrationData;

// Datos cargados desde el API
export interface RegistrationOptions {
  categorias: Categoria[];
  vendedores: Vendedor[];
}
