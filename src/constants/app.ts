// Configurações centralizadas da aplicação

export const APP_CONFIG = {
  NAME: 'StarPrint CRM',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de Gestão de Relacionamento com Cliente',
  STORAGE_KEYS: {
    USER: 'crm_user',
    THEME: 'crm_theme',
    PREFERENCES: 'crm_preferences'
  },
  ROUTES: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    NOT_FOUND: '/404'
  },
  PERFORMANCE: {
    DEBOUNCE_DELAY: 300,
    LAZY_LOAD_DELAY: 100,
    ANIMATION_DURATION: 200
  }
} as const;

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600
} as const;

export const STATUS_COLORS = {
  'Em andamento': 'bg-amber-100 text-amber-800 border-amber-200',
  'Fechado': 'bg-rose-100 text-rose-800 border-rose-200',
  'Resolvido': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Novo': 'bg-blue-100 text-blue-800 border-blue-200',
  'Urgente': 'bg-red-100 text-red-800 border-red-200'
} as const;