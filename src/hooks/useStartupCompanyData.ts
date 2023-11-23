import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CompanyType = {
    avatar: string;
    category: string;
    companyEmail: string;
    companyName: string;
    companyUrl: string;
    createdAt: Date;
    demos: Array<string>;
    description: string;
    profileViews: Array<string>;
    _id: string;
};

type CompanyStateType = {
    company: CompanyType| {};
}

type CompanyActionsType = {
    setCompany: (company: CompanyType) => void;
    clearCompany: () => void;
};

export const useStartupCompanyData = create(
    persist<CompanyStateType & CompanyActionsType>(
      (set) => ({
        company: {},
        clearCompany: () => set(() => ({ company: {} })),
        setCompany: (company: CompanyType) => set(() => ({ company })),
      }),
      {
        name: 'startup-company-data-storage',
      },
    ),
  );