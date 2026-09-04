import { formatCurrency } from '../../constants'

function StatCards ({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  const cards = [
    { label: 'Income', value: formatCurrency(income) },
    { label: 'Expenses', value: formatCurrency(expense) },
    { label: 'Balance', value: formatCurrency(balance) }
  ]

  return (
    <div className='stat-cards'>
      <div className='card-grid'>
        {cards.map(card => (
          <div key={card.label} className='card'>
            <div className='card-label'>{card.label}</div>
            <div className='card-amount'>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatCards
