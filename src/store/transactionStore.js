import {create} from "zustand";

const useTransactionStore = create((set) => ({
    transactions: [],
    currentYear: "",
    currentMonth: "",
    addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
    deleteTransaction: (id) => set(state => ({ transactions: state.transactions.filter(transaction => transaction.id !== id)})),
    setTransactions: (transactions) => set({ transactions }),
    sorttransactions: () => set(state => ({transactions: state.transactions.sort((a,b) => (new Date(b.date)) - (new Date(a.date)))})),
    setCurrentYear: (currentYear) => set({ currentYear }),
    setCurrentMonth: (currentMonth) => set({ currentMonth })
}));

export default useTransactionStore