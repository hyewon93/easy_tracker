import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetTransactions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getTransactions = async () => {
            setIsLoading(true);

            try{
                const q = query(collection(firestore, "transactions", authUser.uid, "2024"));
                const querySnapshot = await getDocs(q);

                const tempTransactions = [];
                querySnapshot.forEach(doc => {
                    tempTransactions.push({id: doc.id, ...doc.data()});
                });

                tempTransactions.sort((a,b) => b.date - a.date);
                setTransactions(tempTransactions);

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if(authUser) getTransactions();

    }, [authUser, showToast, setTransactions]);

    return {isLoading, transactions}
}

export default useGetTransactions