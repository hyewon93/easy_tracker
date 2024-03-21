import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCurrentCategoryStore = create(
    persist(
        (set) => ({
            currentCategories: [],
            setCurrentCategories: (currentCategories) => set({currentCategories})
        }),
        {
            name: 'user-currentCategory',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useCurrentCategoryStore;