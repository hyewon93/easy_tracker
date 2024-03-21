import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { firestore } from '../firebase/firebase';
import { collection, doc, setDoc } from '@firebase/firestore';
import useTransactionStore from '../store/transactionStore';

const useAddTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const sorttransactions = useTransactionStore((state) => state.sorttransactions);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);

    const add_Transaction = async (inputs) => {

        if(isLoading || !authUser) return;
        setIsLoading(true);

        try{

            const transactionDoc = {
                uid: authUser.uid,
                type: inputs.type,
                year: inputs.year,
                month: inputs.month,
                date: inputs.date,
                categoryIcon: inputs.category.url,
                categoryColor: inputs.category.color,
                categoryName: inputs.category.name,
                content: inputs.content,
                amount: inputs.amount,
            };

            const docRef = doc(collection(firestore, "users", authUser.uid, "transactions"));
            await setDoc(docRef, transactionDoc);

            addTransaction({...transactionDoc, id: docRef.id});
            sorttransactions();

            showToast("Success", "Transaction added successfully", "success");
            setIsLoading(false);

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {isLoading, add_Transaction}
}

export default useAddTransaction