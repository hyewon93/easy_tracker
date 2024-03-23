import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetDashabordData = (currentYear, currentMonth) => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [categoryTransactions, setCategoryTransactions] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getDashboardData = async () => {
            setIsLoading(true);

            try{

                const q = query(
                    collection(firestore, "users", authUser.uid, "transactions"),
                    where("year", "==", Number(currentYear)), 
                    where("month", "==", Number(currentMonth))
                );
                const querySnapshot = await getDocs(q);
                
                const tempTransactions = [];
                if(!querySnapshot.empty) {

                    let totalExpense = 0;
                    let totalIncome = 0;

                    querySnapshot.forEach(doc => {
                        if(doc.data().type === "2") {
                            tempTransactions.push({
                                category: doc.data().categoryName,
                                color: doc.data().categoryColor,
                                amount: doc.data().amount
                            });

                            totalExpense = totalExpense + Number(doc.data().amount);
                        } else {
                            totalIncome = totalIncome + Number(doc.data().amount);
                        }
                    });

                    setTotalExpense(totalExpense);
                    setTotalIncome(totalIncome);

                    const result = tempTransactions.reduce((acc, curr) => {
                        const { category } = curr;
                        if(acc[category]) {
                            acc[category].push(curr);
                        } else {
                            acc[category] = [curr];
                        }
                        return acc;
                    }, {});
    
                    const expenseCategories = [];
                    for(let category in result) {
                        let totalCategoryAmount = 0;
                        let categoryColor = "";
                        const transactions = result[category];
    
                        transactions.forEach((transaction) => {
                            totalCategoryAmount = totalCategoryAmount + Number(transaction.amount);
                            categoryColor = transaction.color;
                        });
    
                        expenseCategories.push({
                            category: category,
                            color: categoryColor,
                            totalAmount: totalCategoryAmount,
                            percentage: (totalCategoryAmount * 100 / totalExpense).toFixed(2)
                        });
                    }

                    expenseCategories.sort((a,b) => b.totalAmount - a.totalAmount);
                    setCategoryTransactions(expenseCategories);
                }

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }

        if(authUser) getDashboardData();
    }, [authUser, showToast, currentYear, currentMonth]);

    return {isLoading, totalExpense, totalIncome, categoryTransactions}
}

export default useGetDashabordData