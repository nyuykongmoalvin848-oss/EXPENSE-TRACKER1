import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BudgetContext = createContext()

export function BudgetProvider ({ children }) {
  const [budgets, setBudgets] = useLocalStorage('budgets', {})

  const setBudget = (categoryId, amount) => {
    setBudgets({ ...budgets, [categoryId]: amount })
  }

  const removeBudget = (categoryId) => {
    const next = { ...budgets }
    delete next[categoryId]
    setBudgets(next)
  }

  return (
    <BudgetContext.Provider value={{ budgets, setBudget, removeBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget () {
  return useContext(BudgetContext)
}
