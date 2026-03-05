import React from 'react';
import { Truck, Box, Ruler, Settings } from 'lucide-react';
import { AttributeOption } from '../types/configuration';

export const ATTRIBUTES: AttributeOption[] = [
  // Capacity
  { 
    id: 'cap-10', 
    category: 'CAPACITY', 
    label: '10 m³', 
    icon: React.createElement(Box, { className: "w-5 h-5" }), 
    description: 'Standard Volume' 
  },
  { 
    id: 'cap-15', 
    category: 'CAPACITY', 
    label: '15 m³', 
    icon: React.createElement(Box, { className: "w-6 h-6" }), 
    description: 'High Volume' 
  },
  { 
    id: 'cap-20', 
    category: 'CAPACITY', 
    label: '20 m³', 
    icon: React.createElement(Box, { className: "w-7 h-7" }), 
    description: 'Max Volume' 
  },
  
  // Type
  { 
    id: 'type-std', 
    category: 'TYPE', 
    label: 'Estándar', 
    icon: React.createElement(Truck, { className: "w-5 h-5" }), 
    description: 'General Purpose' 
  },
  { 
    id: 'type-rock', 
    category: 'TYPE', 
    label: 'Roquero', 
    icon: React.createElement(Truck, { className: "w-5 h-5" }), 
    description: 'Heavy Duty' 
  },
  { 
    id: 'type-light', 
    category: 'TYPE', 
    label: 'Ligero', 
    icon: React.createElement(Truck, { className: "w-5 h-5" }), 
    description: 'Fuel Efficient' 
  },

  // Chassis
  { 
    id: 'chassis-6x4', 
    category: 'CHASSIS', 
    label: '6x4', 
    icon: React.createElement(Ruler, { className: "w-5 h-5" }), 
    description: 'Standard Axle' 
  },
  { 
    id: 'chassis-8x4', 
    category: 'CHASSIS', 
    label: '8x4', 
    icon: React.createElement(Ruler, { className: "w-5 h-5" }), 
    description: 'Extra Axle' 
  },

  // Gate
  { 
    id: 'gate-std', 
    category: 'GATE', 
    label: 'Manual', 
    icon: React.createElement(Settings, { className: "w-5 h-5" }), 
    description: 'Standard Hinge' 
  },
  { 
    id: 'gate-hyd', 
    category: 'GATE', 
    label: 'Hidráulica', 
    icon: React.createElement(Settings, { className: "w-5 h-5" }), 
    description: 'Auto Opening' 
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  CAPACITY: 'Capacity Volume',
  TYPE: 'Body Type',
  CHASSIS: 'Chassis Configuration',
  GATE: 'Tailgate Mechanism',
};

export const CATEGORY_ICONS: Record<string, string> = {
  CAPACITY: 'Box',
  TYPE: 'Truck',
  CHASSIS: 'Ruler',
  GATE: 'Settings',
};
