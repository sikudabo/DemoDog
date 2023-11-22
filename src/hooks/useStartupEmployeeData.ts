import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';

type StartupEmployeeStateType = {
    employee: StartupEmployeeType | {};
}

type StartupEmployeeActionsType = {
    setEmployee: (employee: StartupEmployeeType) => void;
    clearEmployee: () => void;
};

export const useStartupEmployeeData = create(
    persist<StartupEmployeeStateType & StartupEmployeeActionsType>(
      (set) => ({
        employee: {},
        clearEmployee: () => set(() => ({ employee: {} })),
        setEmployee: (employee: StartupEmployeeType) => set(() => ({ employee })),
      }),
      {
        name: 'startup-employee-data-storage',
      },
    ),
  );