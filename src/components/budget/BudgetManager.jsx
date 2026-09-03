import { useState } from 'react'
import { useBudget } from '../../context/BudgetContext'
import { useCategories } from '../../context/CategoriesContext'

export default function BudgetManager () {
  const { budgets, setCategoryBudget } = useBudget()
  const { categories } = useCategories()
  const [values, setValues] = useState({})

  const setVal = (id, v) => setValues({ ...values, [id]: v })

  return (
    <div className='budget-manager'>
      <h3>Per-Category Budgets</h3>
      {categories.map((c) => (
        <div key={c.id} className='budget-manager-row'>
          <span className='cat-dot' style={{ background: c.colour }} />
          <span className='budget-cat-name'>{c.name}</span>
          <input
            type='number'
            placeholder={budgets[c.id] ? `$${budgets[c.id]}` : 'No budget'}
            value={values[c.id] || ''}
            onChange={(e) => setVal(c.id, e.target.value)}
          />
          <button
            type='button'
            onClick={() => {
              if (values[c.id] !== undefined && values[c.id] !== '') {
                setCategoryBudget(c.id, parseFloat(values[c.id]))
                setVal(c.id, '')
              }
            }}
          >
            Set
          </button>
        </div>
      ))}
    </div>
  )
}