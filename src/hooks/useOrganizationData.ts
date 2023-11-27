import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrganizationType } from '../typings/OrganizationType';

type OrganizationStateType = {
    organization: OrganizationType | {};
};

type OrganizationActionsType = {
    setOrganization: (organization: OrganizationType) => void;
    clearOrganization: () => void;
};

export const useOrganizationData = create(
    persist<OrganizationStateType & OrganizationActionsType>(
      (set) => ({
        organization: {},
        clearOrganization: () => set(() => ({ organization: {} })),
        setOrganization: (organization: OrganizationType) => set(() => ({ organization })),
      }),
      {
        name: 'organization-company-data-storage',
      },
    ),
  );