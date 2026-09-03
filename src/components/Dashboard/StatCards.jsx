import { formatCurrency } from '../../constants'

function StatCards ({ transactions, budgets }) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense

  const totalBudget = Object.values(budgets).reduce((s, v) => s + (Number(v) || 0), 0)
  const budgetLeft = totalBudget - expense
  const overBudget = totalBudget > 0 && expense > totalBudget
  const pct = totalBudget > 0 ? Math.min(100, (expense / totalBudget) * 100) : 0

  const stats = [
    { label: 'Income', value: formatCurrency(income) },
    { label: 'Expenses', value: formatCurrency(expense) },
    { label: 'Balance', value: formatCurrency(balance) },
    { label: 'Budget Left', value: formatCurrency(budgetLeft), danger: overBudget }
  ]

  return (
    <div className='cards-wrap'>
      <div className='cards'>
        {stats.map((stat) => (
          <div key={stat.label} className='card'>
            <div className='label'>{stat.label}</div>
            <div className={`amount ${stat.danger ? 'over' : ''}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {totalBudget > 0 && (
        <div className='budget-progress-wrap'>
          <div className='progress'>
            <div
              className={`progress-bar ${overBudget ? 'over' : ''}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {overBudget && (
            <p className='warning'>You are over budget by {formatCurrency(expense - totalBudget)}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default StatCards