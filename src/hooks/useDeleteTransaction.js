import { useState } from "react";
import useShowToast from "./useShowToast"
import useTransactionStore from "../store/transactionStore";
import useAuthStore from "../store/authStore";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

const useDeleteTransaction = () => {

    const [isDeleting, setIsDeleting] = useState(false);
    const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);

    const delete_transaction = async (transaction) => {
        
        if(isDeleting || !authUser) return;
        setIsDeleting(true);

        try {
            
            const docRef = doc(collection(firestore, "users", authUser.uid, "transactions"), transaction.id);
            await deleteDoc(docRef);

            deleteTransaction(transaction.id);

            showToast("Success", "Transaction deleted successfully", "success");
            setIsDeleting(false);

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {isDeleting, delete_transaction}
}

export default useDeleteTransaction