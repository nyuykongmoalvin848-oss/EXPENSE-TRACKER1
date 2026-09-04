import { useState, useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'
import FilterBar from '../components/transactions/FilterBar'

export default function TransactionsPage () {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()
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

  return (
    <>
      <TransactionForm onSubmit={addTransaction} />
      <FilterBar filters={filters} onChange={setFilters} />
      <div className='list-header'>
        <h3>Transactions ({filtered.length})</h3>
      </div>
      <TransactionList transactions={filtered} onDelete={deleteTransaction} />
    </>
  )
}
