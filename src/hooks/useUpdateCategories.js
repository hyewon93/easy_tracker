import { defaultCategory } from "../assets/defaultCategories";
import useShowToast from "./useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useCategoryStore from "../store/categoryStore";
import { useState } from "react";
import useCurrentCategoryStore from "../store/currentCategoryStore";
import useAuthStore from "../store/authStore";

const useUpdateCategories = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const setCategory = useCategoryStore((state) => state.setCategory);
  const currentCategories = useCurrentCategoryStore((state) => state.currentCategories);

  const updateCategories = async () => {

    setIsUpdating(true);

    try {

      const categoryRef = (doc(firestore, "categories", authUser.uid));
      const categorySnap = await getDoc(categoryRef);

      if(!categorySnap.exists()) {
        // Create

        await setDoc(doc(firestore, "categories", authUser.uid), defaultCategory);
        setCategory(defaultCategory);

      } else {
        // Update

        await setDoc(doc(firestore, "categories", authUser.uid), currentCategories);
        setCategory(currentCategories);

        showToast("Success", "Category updated successfully", "success");
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
    
  }

  return {isUpdating, updateCategories}
}

export default useUpdateCategories