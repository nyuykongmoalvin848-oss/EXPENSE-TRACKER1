import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useCategories } from '../../context/CategoriesContext'

function Charts ({ transactions, budgets }) {
  const { categories } = useCategories()

  const pieData = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return [
      { name: 'Income', value: income },
      { name: 'Expenses', value: expense }
    ]
  }, [transactions])

  const byCategory = useMemo(() => {
    return categories
      .map((c) => {
        const spent = transactions
          .filter((t) => t.type === 'expense' && t.category === c.id)
          .reduce((s, t) => s + t.amount, 0)
        return { id: c.id, name: c.name, colour: c.colour, spent, budget: budgets[c.id] || 0 }
      })
      .filter((c) => c.spent > 0 || c.budget > 0)
  }, [categories, transactions, budgets])

  return (
    <div className='charts'>
      <div className='chart-card'>
        <h3 className='chart-title'>Income vs Expenses</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={pieData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
              {pieData.map((_, i) => <Cell key={i} fill={i === 0 ? '#10b981' : '#ef4444'} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='chart-card'>
        <h3 className='chart-title'>Spending by Category</h3>
        {byCategory.length === 0 ? (
          <p className='empty-state'>No expenses recorded yet.</p>
        ) : (
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie data={byCategory} cx='50%' cy='50%' outerRadius={80} dataKey='spent' nameKey='name' label>
                {byCategory.map((c) => <Cell key={c.id} fill={c.colour} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className='chart-card'>
        <h3 className='chart-title'>Category Budgets</h3>
        {byCategory.filter((c) => c.budget > 0).length === 0 ? (
          <p className='empty-state'>No category budgets set.</p>
        ) : (
          <div className='budget-list'>
            {byCategory.filter((c) => c.budget > 0).map((c) => {
              const pct = Math.min(100, (c.spent / c.budget) * 100)
              const over = c.spent > c.budget
              return (
                <div key={c.id} className='budget-row'>
                  <div className='budget-row-head'>
                    <span><span className='cat-dot' style={{ background: c.colour }} /> {c.name}</span>
                    <span className={over ? 'over' : ''}>${c.spent.toFixed(2)} / ${c.budget.toFixed(2)}</span>
                  </div>
                  <div className='progress small'>
                    <div className={`progress-bar ${over ? 'over' : ''}`} style={{ width: `${pct}%`, background: c.colour }} />
                  </div>
                  {over && <p className='warning small'>Over by ${(c.spent - c.budget).toFixed(2)}</p>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Charts