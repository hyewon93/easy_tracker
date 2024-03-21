import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";
import useTransactionStore from "../store/transactionStore";

const useGetTransactions = (currentYear, currentMonth) => {
    const [isLoading, setIsLoading] = useState(true);
    const [years, setYears] = useState([]);
    const transactions = useTransactionStore((state) => state.transactions);
    const setTransactions = useTransactionStore((state) => state.setTransactions);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getTransactions = async () => {
            setIsLoading(true);

            try{

                const all_q = query(collection(firestore, "users", authUser.uid, "transactions"));
                const all_querySnapshot = await getDocs(all_q);

                const tempYears = [];
                if(!all_querySnapshot.empty) {
                    all_querySnapshot.forEach(doc => {
                        if(!tempYears.includes(doc.data().date.slice(0,4))) {
                            tempYears.push(doc.data().date.slice(0,4));
                        }
                    });
                } else {
                    tempYears.push((new Date()).getFullYear());
                }

                const q = query(
                    collection(firestore, "users", authUser.uid, "transactions"), 
                    where("year", "==", Number(currentYear)), 
                    where("month", "==", Number(currentMonth))
                );
                const querySnapshot = await getDocs(q);

                const tempTransactions = [];

                if(!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        tempTransactions.push({id: doc.id, ...doc.data()});
    
                        if(!tempYears.includes(doc.data().date.slice(0,4))) {
                            tempYears.push(doc.data().date.slice(0,4));
                        }
                    });
                }

                tempTransactions.sort((a,b) => (new Date(b.date)) - (new Date(a.date)));
                setTransactions(tempTransactions);
                setYears(tempYears);

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if(authUser) getTransactions();

    }, [authUser, showToast, setTransactions, currentYear, currentMonth]);

    return {isLoading, transactions, years}
}

export default useGetTransactions