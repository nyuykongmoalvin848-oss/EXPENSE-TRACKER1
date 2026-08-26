 import { useState } from 'react'

function BudgetForm({ onSubmit }) {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return
    onSubmit(parseFloat(amount))
    setAmount('')
  }

  return (
    <form className="form budget-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Monthly Budget"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="submit">Set Budget</button>
    </form>
  )
}

export default BudgetForm
