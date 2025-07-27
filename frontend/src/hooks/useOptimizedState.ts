import { useState, useCallback, useRef } from 'react';
import { APP_CONFIG } from '@/constants/app';

/**
 * Hook otimizado para estados com debounce e performance melhorada
 */
export const useOptimizedState = <T>(
  initialValue: T,
  debounceMs: number = APP_CONFIG.PERFORMANCE.DEBOUNCE_DELAY
) => {
  const [value, setValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingRef = useRef(false);

  const debouncedSetValue = useCallback((newValue: T | ((prev: T) => T)) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isUpdatingRef.current = true;

    timeoutRef.current = setTimeout(() => {
      setValue(newValue);
      isUpdatingRef.current = false;
    }, debounceMs);
  }, [debounceMs]);

  const setValueImmediate = useCallback((newValue: T | ((prev: T) => T)) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setValue(newValue);
    isUpdatingRef.current = false;
  }, []);

  return {
    value,
    setValue: debouncedSetValue,
    setValueImmediate,
    isUpdating: isUpdatingRef.current
  };
};

/**
 * Hook para filtros com performance otimizada
 */
export const useFilterState = <T>(
  items: T[],
  filterFn: (item: T, query: string) => boolean
) => {
  const { value: query, setValue: setQuery } = useOptimizedState('');
  
  const filteredItems = query.trim() 
    ? items.filter(item => filterFn(item, query.toLowerCase()))
    : items;

  return {
    query,
    setQuery,
    filteredItems,
    hasFilter: query.trim().length > 0
  };
};