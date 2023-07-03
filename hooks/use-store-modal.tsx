import { create } from 'zustand'

interface BoardState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;

}

export const useStoreMal = create<BoardState>( (set, get) => ({
    isOpen :  false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),

}))
