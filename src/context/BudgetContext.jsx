import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BudgetContext = createContext()

export function BudgetProvider ({ children }) {
  const [budgets, setBudgets] = useLocalStorage('budgets', {})

  const setCategoryBudget = (categoryId, amount) => {
    setBudgets({ ...budgets, [categoryId]: amount })
  }

  return (
    <BudgetContext.Provider value={{ budgets, setCategoryBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget () {
  return useContext(BudgetContext)
}