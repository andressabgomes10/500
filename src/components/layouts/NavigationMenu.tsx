import React, { memo } from 'react';
import { NavigationItem } from './NavigationItem';
import { useNavigationItems } from '@/hooks/useNavigation';
import { usePermissions } from '@/hooks/usePermissions';

interface NavigationMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  compact?: boolean;
}

export const NavigationMenu = memo(({ 
  activeSection, 
  onSectionChange, 
  compact = false 
}: NavigationMenuProps) => {
  const navigationItems = useNavigationItems();
  const { filterByPermissions } = usePermissions();

  const allowedItems = filterByPermissions(navigationItems);

  return (
    <div className="space-y-2">
      {allowedItems.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          onClick={onSectionChange}
          compact={compact}
        />
      ))}
    </div>
  );
});

NavigationMenu.displayName = 'NavigationMenu';