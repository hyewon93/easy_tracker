import {create} from "zustand";

const useCurrentCategoryStore = create((set) => ({
    currentCategories: [],
    setCurrentCategories: (currentCategories) => set({currentCategories})
}));

export default useCurrentCategoryStore;