import { defaultCategory } from "../assets/defaultCategories";
import useShowToast from "./useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useCategoryStore from "../store/categoryStore";

const useUpdateCategories = () => {

  const showToast = useShowToast();
  const setCategory = useCategoryStore((state) => state.setCategory);

  const updateCategories = async ({uid, categories}) => {

    try {

      const categoryRef = (doc(firestore, "categories", uid));
      const categorySnap = await getDoc(categoryRef);

      if(!categorySnap.exists()) {
        // Create

        await setDoc(doc(firestore, "categories", uid), defaultCategory);
        setCategory(defaultCategory);

      } else {
        // Update
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    }
    
  }

  return {updateCategories}
}

export default useUpdateCategories