import { useState, useEffect } from 'react'
import { useCategories } from '../../context/CategoriesContext'

const today = () => new Date().toISOString().split('T')[0]

function emptyTx () {
  return { description: '', amount: '', type: 'expense', category: 'food', date: today(), note: '' }
}

export default function TransactionForm ({ initial, onSubmit, onCancel }) {
  const { categories } = useCategories()
  const [form, setForm] = useState(emptyTx())
  const isEdit = Boolean(initial)

  useEffect(() => {
    if (initial) setForm({ ...emptyTx(), ...initial })
  }, [initial])

  const set = (key, value) => setForm({ ...form, [key]: value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount) return
    onSubmit({ ...form, amount: parseFloat(form.amount) })
    if (!isEdit) setForm(emptyTx())
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-type">
        <button type="button" className={form.type === 'income' ? 'active' : ''} onClick={() => set('type', 'income')}>Income</button>
        <button type="button" className={form.type === 'expense' ? 'active' : ''} onClick={() => set('type', 'expense')}>Expense</button>
      </div>

      <input type="text" placeholder="Description" value={form.description} onChange={(e) => set('description', e.target.value)} />

      <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => set('amount', e.target.value)} />

      <select value={form.category} onChange={(e) => set('category', e.target.value)}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />

      <input type="text" placeholder="Note (optional)" value={form.note} onChange={(e) => set('note', e.target.value)} />

      <div className="form-actions">
        <button type="submit" className="submit">{isEdit ? 'Update' : 'Add'}</button>
        {isEdit && <button type="button" className="cancel" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}