import { useState } from 'react'
import StatCards from './components/Dashboard/StatCards'
import TransactionForm from './components/transactions/TransactionForm'
import TransactionItem from './components/transactions/TransactionItem'
import './App.css'

function App () {
  const [transactions, setTransactions] = useState([])

  const handleAdd = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }])
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div className='wrap'>
      <h1 className='title'>Expense Tracker</h1>
      <StatCards transactions={transactions} />
      <TransactionForm onSubmit={handleAdd} />
      <ul className='list'>
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}

export default App
