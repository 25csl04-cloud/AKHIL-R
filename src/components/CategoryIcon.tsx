import React from 'react';
import { WasteCategory } from '../types/waste';
import {
  Package,
  FileText,
  Boxes,
  Wine,
  Hammer,
  Apple,
  Cpu,
  HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  category: WasteCategory | string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-5 h-5' }) => {
  switch (category) {
    case 'Plastic':
      return <Package className={className} />;
    case 'Paper':
      return <FileText className={className} />;
    case 'Cardboard':
      return <Boxes className={className} />;
    case 'Glass':
      return <Wine className={className} />;
    case 'Metal':
      return <Hammer className={className} />;
    case 'Organic Waste':
      return <Apple className={className} />;
    case 'E-Waste':
      return <Cpu className={className} />;
    case 'Other / Unknown':
    default:
      return <HelpCircle className={className} />;
  }
};
