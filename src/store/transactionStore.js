import {create} from "zustand";

const useTransactionStore = create((set) => ({
    transactions: [],
    addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
    deleteTransaction: (id) => set(state => ({ transactions: state.transactions.filter(transaction => transaction.id !== id)})),
    setTransactions: (transactions) => set({ transactions }),
}));

export default useTransactionStore