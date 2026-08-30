import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Dashboard from './components/Dashboard/dashboard'
import TransactionForm from './components/transactions/TransactionForm'
import TransactionItem from './components/transactions/TransactionItem'
import BudgetForm from './components/budget/BudgetForm'
import './App.css'

function AppContent () {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget')
    return saved ? parseFloat(saved) : 0
  })

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('budget', budget.toString())
  }, [budget])

  const handleAdd = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }])
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const handleBudget = (amount) => setBudget(amount)

  const { theme, toggleTheme } = useTheme()

  return (
    <div className='wrap'>
      <header className='header'>
        <h1 className='title'>Expense Tracker</h1>
        <button className='theme-btn' onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>
      <Dashboard transactions={transactions} budget={budget} />
      <BudgetForm onSubmit={handleBudget} />
      <TransactionForm onSubmit={handleAdd} />
      <ul className='list'>
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}

function App () {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
