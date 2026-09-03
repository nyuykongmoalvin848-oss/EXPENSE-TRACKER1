import { Link } from 'react-router-dom'
import { useTransactions } from '../context/TransactionsContext'
import { useBudget } from '../context/BudgetContext'
import { useCategories } from '../context/CategoriesContext'
import { formatCurrency } from '../constants'
import { ArrowLeft } from 'lucide-react'

export default function Stats () {
  const { transactions } = useTransactions()
  const { budgets } = useBudget()
  const { categories } = useCategories()

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  return (
    <div className='wrap'>
      <header className='header'>
        <Link to='/' className='nav-link'><ArrowLeft size={16} /> Back</Link>
        <h1 className='title'>Statistics</h1>
      </header>

      <div className='cards'>
        <div className='card'><div className='label'>Total Income</div><div className='amount'>{formatCurrency(income)}</div></div>
        <div className='card'><div className='label'>Total Expenses</div><div className='amount'>{formatCurrency(expense)}</div></div>
        <div className='card'><div className='label'>Net</div><div className='amount'>{formatCurrency(income - expense)}</div></div>
      </div>

      <h3 style={{ marginTop: '24px' }}>Per-Category Totals</h3>
      <ul className='list'>
        {categories.map((c) => {
          const spent = transactions.filter(t => t.type === 'expense' && t.category === c.id).reduce((s, t) => s + t.amount, 0)
          const budget = budgets[c.id] || 0
          return (
            <li key={c.id} className='list-item expense'>
              <span className='cat-dot' style={{ background: c.colour }} />
              <span className='tx-desc'>{c.name}</span>
              <span className='tx-amount'>{formatCurrency(spent)}{budget ? ` / ${formatCurrency(budget)}` : ''}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}