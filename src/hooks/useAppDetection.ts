import { useState, useEffect } from 'react';

interface AppDetection {
  isNativeApp: boolean;
  isPWA: boolean;
  isWebView: boolean;
  platform: 'ios' | 'android' | 'web';
  orientation: 'portrait' | 'landscape';
}

export const useAppDetection = (): AppDetection => {
  const [detection, setDetection] = useState<AppDetection>({
    isNativeApp: false,
    isPWA: false,
    isWebView: false,
    platform: 'web',
    orientation: 'portrait'
  });

  useEffect(() => {
    const detectEnvironment = () => {
      // Detectar PWA
      const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                    (window.navigator as any).standalone ||
                    document.referrer.includes('android-app://');

      // Detectar WebView
      const isWebView = /WebView|wv|Android.*(wv|\.0\.0\.0)|Version\/[\d\.]+.*Safari\/[^/]*$/.test(navigator.userAgent);

      // Detectar plataforma
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      let platform: 'ios' | 'android' | 'web' = 'web';
      if (isIOS) platform = 'ios';
      else if (isAndroid) platform = 'android';

      // Detectar orientação
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

      // Detectar app nativo (Capacitor)
      const isNativeApp = !!(window as any).Capacitor;

      setDetection({
        isNativeApp,
        isPWA,
        isWebView,
        platform,
        orientation
      });
    };

    detectEnvironment();

    // Escutar mudanças de orientação
    const handleOrientationChange = () => {
      setTimeout(detectEnvironment, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return detection;
};