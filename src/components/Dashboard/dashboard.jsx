import { useMemo } from 'react'
import StatCards from './StatCards'
import Charts from './Charts'

function Dashboard ({ transactions, budget }) {
  const chartData = useMemo(() => {
    const byDate = {}
    transactions.forEach(t => {
      if (!byDate[t.date]) byDate[t.date] = { income: 0, expense: 0 }
      byDate[t.date][t.type] += t.amount
    })
    return Object.entries(byDate)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [transactions])

  return (
    <div className='dashboard'>
      <StatCards transactions={transactions} budget={budget} />
      <Charts data={chartData} transactions={transactions} budget={budget} />
    </div>
  )
}

export default Dashboard
