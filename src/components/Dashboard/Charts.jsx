import { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

function Charts ({ transactions }) {
  const pieData = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return [
      { name: 'Income', value: income },
      { name: 'Expenses', value: expense }
    ]
  }, [transactions])

  return (
    <div className='charts'>
      <div className='chart-card'>
        <h3 className='chart-title'>Income vs Expenses</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={pieData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
              {pieData.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Charts
