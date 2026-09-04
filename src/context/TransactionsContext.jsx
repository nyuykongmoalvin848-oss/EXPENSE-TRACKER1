import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TransactionsContext = createContext()

export function TransactionsProvider ({ children }) {
  const [transactions, setTransactions] = useLocalStorage('transactions', [])

  const addTransaction = (tx) => {
    setTransactions([...transactions, { ...tx, id: Date.now().toString() }])
  }

  const deleteTransaction = (id) => {
    if (window.confirm('Delete this transaction?')) {
      setTransactions(transactions.filter((t) => t.id !== id))
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions () {
  return useContext(TransactionsContext)
}