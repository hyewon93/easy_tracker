import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories: [],
    setCategory: (categories) => set({categories})
}));

export default useCategoryStore;