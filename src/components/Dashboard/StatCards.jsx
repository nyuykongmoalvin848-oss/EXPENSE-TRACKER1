import { formatCurrency } from '../../constants'

function StatCards ({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  const stats = [
    { label: 'Total Income', value: formatCurrency(income) },
    { label: 'Total Expenses', value: formatCurrency(expense) },
    {
      label: 'Balance',
      value: formatCurrency(balance),
    }
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
