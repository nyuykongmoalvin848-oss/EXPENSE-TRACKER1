import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useTransactions } from '../context/TransactionsContext'
import { useBudget } from '../context/BudgetContext'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'
import FilterBar from '../components/transactions/FilterBar'
import Dashboard from '../components/Dashboard/dashboard'
import BudgetManager from '../components/budget/BudgetManager'
import { Moon, Sun, BarChart } from 'lucide-react'

export default function Home () {
  const { theme, toggleTheme } = useTheme()
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  const { budgets } = useBudget()
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({ month: '', type: '', category: '', search: '' })

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    return transactions.filter((t) => {
      if (filters.month && !t.date.startsWith(filters.month)) return false
      if (filters.type && t.type !== filters.type) return false
      if (filters.category && t.category !== filters.category) return false
      if (search && !(t.note || '').toLowerCase().includes(search)) return false
      return true
    })
  }, [transactions, filters])

  const handleSubmit = (tx) => {
    if (editing) {
      updateTransaction(editing.id, tx)
      setEditing(null)
    } else {
      addTransaction(tx)
    }
  }

  const handleEdit = (tx) => setEditing(tx)
  const handleCancel = () => setEditing(null)

  return (
    <div className='wrap'>
      <header className='header'>
        <h1 className='title'>Expense Tracker</h1>
        <nav className='nav'>
          <Link to='/stats' className='nav-link'><BarChart size={16} /> Stats</Link>
          <button className='theme-btn' onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <Dashboard transactions={filtered} budgets={budgets} />

      <BudgetManager />

      <TransactionForm
        initial={editing}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <FilterBar filters={filters} onChange={setFilters} />

      <div className='list-header'>
        <h3>Transactions ({filtered.length})</h3>
        {editing && (
          <button className='cancel' onClick={handleCancel}>Cancel edit</button>
        )}
      </div>

      <TransactionList transactions={filtered} onEdit={handleEdit} />
    </div>
  )
}