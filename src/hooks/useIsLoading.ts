import { create } from 'zustand';

type IsLoadingStateType = {
    isLoading: boolean;
};

type IsLoadingActionsType = {
    setIsLoading: (isLoading: boolean) => void;
};

export const useIsLoading = create<IsLoadingStateType & IsLoadingActionsType>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
