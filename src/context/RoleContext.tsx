import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'Admin' | 'Auditor' | 'Viewer';

interface RoleContextType {
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const logout = () => {
    setUserRole(null);
  };

  return (
    <RoleContext.Provider value={{ userRole, setUserRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
