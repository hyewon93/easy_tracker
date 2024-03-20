import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCategoryStore = create(
    persist(
        (set) => ({
            categories: [],
            setCategory: (categories) => set({categories})
        }),
        {
            name: 'user-category',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useCategoryStore;