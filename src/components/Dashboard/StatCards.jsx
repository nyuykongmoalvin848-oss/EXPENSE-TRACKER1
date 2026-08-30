import { formatCurrency } from '../../constants'

function StatCards ({ transactions, budget }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense
  const budgetLeft = budget - expense

  const stats = [
    { label: 'Income', value: formatCurrency(income), color: 'var(--text-primary)' },
    { label: 'Expenses', value: formatCurrency(expense), color: 'var(--text-primary)' },
    { label: 'Balance', value: formatCurrency(balance), color: 'var(--text-primary)' },
    { label: 'Budget', value: formatCurrency(Math.max(0, budgetLeft)), color: 'var(--text-primary)' }
  ]

  return (
    <div className='cards'>
      {stats.map((stat) => (
        <div key={stat.label} className='card'>
          <div className='label'>{stat.label}</div>
          <div className='amount' style={{ color: stat.color }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatCards
