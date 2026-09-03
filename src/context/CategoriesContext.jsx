import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CategoriesContext = createContext()

const DEFAULT_Categories = [
  { id: 'food', name: 'Food', colour: '#ef4444' },
  { id: 'transport', name: 'Transport', colour: '#3b82f6' },
  { id: 'housing', name: 'Housing', colour: '#10b981' },
  { id: 'entertainment', name: 'Entertainment', colour: '#f59e0b' },
  { id: 'other', name: 'Other', colour: '#6b7280' }
]

export function CategoriesProvider ({ children }) {
  const [categories, setCategories] = useLocalStorage('categories', DEFAULT_Categories)

  const addCategory = (name, colour) => {
    setCategories([...categories, { id: Date.now().toString(), name, colour }])
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories () {
  return useContext(CategoriesContext)
}