import { useReducer, useCallback, useEffect } from 'react';
import { ConfigurationState, ConfigurationAction, AttributeOption } from '../types/configuration';

const initialState: ConfigurationState = {
  CAPACITY: null,
  TYPE: null,
  CHASSIS: null,
  GATE: null,
};

function configurationReducer(state: ConfigurationState, action: ConfigurationAction): ConfigurationState {
  switch (action.type) {
    case 'SELECT_ATTRIBUTE': {
      const { category, id } = action.payload;
      return {
        ...state,
        [category]: state[category] === id ? null : id,
      };
    }
    case 'CLEAR_ALL':
      return initialState;
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

const STORAGE_KEY = 'ironclad_config';

export function useConfiguration() {
  const [state, dispatch] = useReducer(configurationReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load configuration:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectAttribute = useCallback((attribute: AttributeOption) => {
    dispatch({ type: 'SELECT_ATTRIBUTE', payload: attribute });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const progress = Object.values(state).filter(Boolean).length;
  const total = Object.keys(state).length;
  const isComplete = progress === total;

  return {
    config: state,
    selectAttribute,
    clearAll,
    progress,
    total,
    isComplete,
  };
}
