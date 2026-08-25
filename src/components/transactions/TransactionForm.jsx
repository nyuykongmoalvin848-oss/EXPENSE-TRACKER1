import { useState } from 'react'

function TransactionForm({ onSubmit }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description || !amount) return

    onSubmit({
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0],
    })

    setDescription('')
    setAmount('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-type">
        <button
          type="button"
          className={type === 'income' ? 'active' : ''}
          onClick={() => setType('income')}
        >
          Income
        </button>
        <button
          type="button"
          className={type === 'expense' ? 'active' : ''}
          onClick={() => setType('expense')}
        >
          Expense
        </button>
      </div>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit" className="submit">
        Add
      </button>
    </form>
  )
}

export default TransactionForm
