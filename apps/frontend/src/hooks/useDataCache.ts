import { useState, useEffect, useCallback } from 'react';
import { APP_CONFIG } from '@/constants/app';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

/**
 * Hook para cache de dados com TTL e invalidação automática
 */
export const useDataCache = <T>(
  key: string,
  ttl: number = 5 * 60 * 1000 // 5 minutos padrão
) => {
  const [cache, setCache] = useState<Map<string, CacheEntry<T>>>(new Map());

  const set = useCallback((data: T) => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.set(key, entry);
      return newCache;
    });
  }, [key, ttl]);

  const get = useCallback((): T | null => {
    const entry = cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    if (Date.now() > entry.expiry) {
      // Cache expirado, remover
      setCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(key);
        return newCache;
      });
      return null;
    }
    
    return entry.data;
  }, [cache, key]);

  const invalidate = useCallback(() => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(key);
      return newCache;
    });
  }, [key]);

  const isValid = useCallback((): boolean => {
    const entry = cache.get(key);
    return !!entry && Date.now() <= entry.expiry;
  }, [cache, key]);

  // Limpeza automática de cache expirado
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCache(prev => {
        const newCache = new Map();
        
        for (const [cacheKey, entry] of prev.entries()) {
          if (now <= entry.expiry) {
            newCache.set(cacheKey, entry);
          }
        }
        
        return newCache;
      });
    }, APP_CONFIG.PERFORMANCE.DEBOUNCE_DELAY);

    return () => clearInterval(interval);
  }, []);

  return {
    set,
    get,
    invalidate,
    isValid,
    hasData: cache.has(key)
  };
};