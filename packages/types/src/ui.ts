import { z } from 'zod';

// ----------------------------------------------------------------------
// Theming & Appearance
// ----------------------------------------------------------------------
export const ThemeSchema = z.enum(['light', 'dark', 'system']);
export type Theme = z.infer<typeof ThemeSchema>;

// ----------------------------------------------------------------------
// Navigation & Routing
// ----------------------------------------------------------------------
export type NavigationNode = {
  title: string;
  href: string;
  icon?: string; // e.g., Lucide icon name
  disabled?: boolean;
  external?: boolean;
  children?: NavigationNode[]; // For nested dropdowns/accordions
};

export type SidebarConfig = {
  mainNav: NavigationNode[];
  footerNav?: NavigationNode[];
};

// ----------------------------------------------------------------------
// Application State
// ----------------------------------------------------------------------
export type AppState = 'idle' | 'loading' | 'success' | 'error';
