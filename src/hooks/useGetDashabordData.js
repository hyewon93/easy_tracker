import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, getAggregateFromServer, getDocs, query, sum, where } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetDashabordData = (currentYear, currentMonth) => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [categoryTransactions, setCategoryTransactions] = useState([]);
    const [last6Months, setLast6Months] = useState({});
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const years = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

                    // Income and Expense in last 6 months
                    const temp_last6Months = {
                        "years": [],
                        "income" : [],
                        "expense" : []
                    };

                    let temp_currentYear = Number(currentYear);
                    let temp_currentMonth = Number(currentMonth);
                    let currentMonthIdx = Number(currentMonth)-1;
                    for(let i=6; i>0; i--) {

                        const coll = collection(firestore, "users", authUser.uid, "transactions");

                        // Income
                        const temp_income_q = query(coll, 
                            where('type', '==', "1"),
                            where('year', '==', temp_currentYear),
                            where('month', '==', temp_currentMonth)
                        );
                        const income_snapshot = await getAggregateFromServer(temp_income_q, {
                            totalAmount: sum('amount')
                        });
                        temp_last6Months.income.push(income_snapshot.data().totalAmount);

                        // Expense
                        const temp_expense_q = query(coll, 
                            where('type', '==', "2"),
                            where('year', '==', temp_currentYear),
                            where('month', '==', temp_currentMonth)
                        );
                        const expense_snapshot = await getAggregateFromServer(temp_expense_q, {
                            totalAmount: sum('amount')
                        });
                        temp_last6Months.expense.push(expense_snapshot.data().totalAmount);

                        if(currentMonthIdx < 0) {
                            temp_last6Months.years.push(years[years.length + currentMonthIdx]);
                            temp_currentMonth--;

                        } else if(currentMonthIdx == 0) {
                            temp_last6Months.years.push(years[currentMonthIdx]); 
                            temp_currentYear--;
                            temp_currentMonth = years.length;

                        } else {
                            temp_last6Months.years.push(years[currentMonthIdx]);                            
                            temp_currentMonth--;
                        }

                        currentMonthIdx--;
                    }

                    temp_last6Months.income.reverse();
                    temp_last6Months.expense.reverse();
                    temp_last6Months.years.reverse();

                    setLast6Months(temp_last6Months);
    
                    // Expenses by category
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

    return {isLoading, totalExpense, totalIncome, categoryTransactions, last6Months}
}

export default useGetDashabordData