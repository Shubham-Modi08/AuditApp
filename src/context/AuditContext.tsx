import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AuditData {
  id: string;
  title: string;
  department: string;
  auditDate: string;
  overallRating: number;
  complianceChecks: {
    documentation: boolean;
    procedures: boolean;
    training: boolean;
    equipment: boolean;
  };
  findings: string;
  recommendations: string;
  images: string[];
  submittedBy: string;
  submittedAt: string;
}

interface AuditContextType {
  audits: AuditData[];
  currentAudit: Partial<AuditData>;
  addAudit: (audit: AuditData) => void;
  deleteAudit: (id: string) => void;
  updateCurrentAudit: (data: Partial<AuditData>) => void;
  clearCurrentAudit: () => void;
  getAuditById: (id: string) => AuditData | undefined;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [audits, setAudits] = useState<AuditData[]>([
    {
      id: '1',
      title: 'IT Security Audit',
      department: 'Information Technology',
      auditDate: '2024-01-15',
      overallRating: 4,
      complianceChecks: {
        documentation: true,
        procedures: true,
        training: false,
        equipment: true,
      },
      findings: 'Overall security posture is good with minor training gaps.',
      recommendations: 'Implement additional security training for staff.',
      images: [],
      submittedBy: 'Admin',
      submittedAt: '2024-01-15T10:30:00Z',
    },
  ]);

  const [currentAudit, setCurrentAudit] = useState<Partial<AuditData>>({});

  const addAudit = (audit: AuditData) => {
    setAudits(prev => [audit, ...prev]);
  };

  const deleteAudit = (id: string) => {
    setAudits(prev => prev.filter(audit => audit.id !== id));
  };

  const updateCurrentAudit = (data: Partial<AuditData>) => {
    setCurrentAudit(prev => ({ ...prev, ...data }));
  };

  const clearCurrentAudit = () => {
    setCurrentAudit({});
  };

  const getAuditById = (id: string) => {
    return audits.find(audit => audit.id === id);
  };

  return (
    <AuditContext.Provider
      value={{
        audits,
        currentAudit,
        addAudit,
        deleteAudit,
        updateCurrentAudit,
        clearCurrentAudit,
        getAuditById,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};
