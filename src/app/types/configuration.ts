import React from 'react';

export type Category = 'CAPACITY' | 'TYPE' | 'CHASSIS' | 'GATE';

export interface AttributeOption {
  id: string;
  category: Category;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface ConfigurationState {
  CAPACITY: string | null;
  TYPE: string | null;
  CHASSIS: string | null;
  GATE: string | null;
}

export type ConfigurationAction =
  | { type: 'SELECT_ATTRIBUTE'; payload: AttributeOption }
  | { type: 'CLEAR_ALL' }
  | { type: 'LOAD_STATE'; payload: ConfigurationState };
