import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#6b7280', '#9ca3af']

function Charts ({ data, transactions, budget }) {
  const pieData = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return [
      { name: 'Income', value: income },
      { name: 'Expenses', value: expense }
    ]
  }, [transactions])

  const budgetData = useMemo(() => {
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const remaining = Math.max(0, budget - expense)
    return [
      { name: 'Spent', value: expense },
      { name: 'Left', value: remaining }
    ]
  }, [transactions, budget])

  return (
    <div className='charts'>
      <div className='chart-card'>
        <h3 className='chart-title'>Daily Totals</h3>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart data={data}>
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='income' fill='#6b7280' />
            <Bar dataKey='expense' fill='#9ca3af' />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='chart-card'>
        <h3 className='chart-title'>Income vs Expenses</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={pieData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='chart-card'>
        <h3 className='chart-title'>Budget Used</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={budgetData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
              {budgetData.map((entry, index) => (
                <Cell key={index} fill={index === 0 ? '#6b7280' : '#9ca3af'} />
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
