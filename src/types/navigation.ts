import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  component?: React.ComponentType;
}

export interface NavigationState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}