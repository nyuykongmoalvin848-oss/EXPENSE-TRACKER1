import { useState } from 'react'
import StatCards from './components/Dashboard/StatCards'
import TransactionForm from './components/transactions/TransactionForm'
import './App.css'

function App () {
  const [transactions, setTransactions] = useState([])

  const handleAdd = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }])
  }

  return (
    <div className='wrap'>
      <h1 className='title'>Expense Tracker</h1>
      <StatCards transactions={transactions} />
      <TransactionForm onSubmit={handleAdd} />
    </div>
  )
}

export default App
