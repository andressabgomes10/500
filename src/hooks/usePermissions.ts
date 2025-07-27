import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { rolePermissions } from '@/types/auth';

export const usePermissions = () => {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    if (!user) return [];
    return rolePermissions[user.role] || [];
  }, [user]);

  const hasPermission = (section: string) => {
    return permissions.includes(section);
  };

  const filterByPermissions = <T extends { id: string }>(items: T[]) => {
    return items.filter(item => hasPermission(item.id));
  };

  return {
    permissions,
    hasPermission,
    filterByPermissions,
    userRole: user?.role
  };
};