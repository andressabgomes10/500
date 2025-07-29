import { useState, useCallback, useMemo } from 'react';
import { navigationItems, getNavigationItem, getDefaultSection } from '@/config/navigation';
import { NavigationState } from '@/types/navigation';

export const useNavigation = (initialSection?: string): NavigationState => {
  const [activeSection, setActiveSectionState] = useState(
    initialSection || getDefaultSection()
  );

  const setActiveSection = useCallback((section: string) => {
    const navItem = getNavigationItem(section);
    if (navItem) {
      setActiveSectionState(section);
    }
  }, []);

  return useMemo(() => ({
    activeSection,
    setActiveSection
  }), [activeSection, setActiveSection]);
};

export const useNavigationItems = () => {
  return useMemo(() => navigationItems, []);
};

export const useActiveNavigationItem = (activeSection: string) => {
  return useMemo(() => getNavigationItem(activeSection), [activeSection]);
};