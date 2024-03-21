import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { firestore } from '../firebase/firebase';
import { collection, doc, setDoc } from '@firebase/firestore';

const useAddTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);

    const addTransaction = async (inputs) => {

        if(isLoading || !authUser) return;
        setIsLoading(true);

        try{

            const transactionDoc = {
                uid: authUser.uid,
                type: inputs.type,
                date: inputs.date,
                categoryIcon: inputs.category.url,
                categoryColor: inputs.category.color,
                categoryName: inputs.category.name,
                content: inputs.content,
                amount: inputs.amount,
            };

            //const doc = await addDoc(collection(firestore, "transactions"), authUser.uid);
            //const document = await setDoc(doc(firestore, "transactions", authUser.uid, "transactions"), transactionDoc)
            //console.log(document.id);

            const docRef = doc(collection(firestore, "transactions", authUser.uid, inputs.date.slice(0,4)));
            await setDoc(docRef, transactionDoc);

            showToast("Success", "Transaction added successfully", "success");
            setIsLoading(false);

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {isLoading, addTransaction}
}

export default useAddTransaction