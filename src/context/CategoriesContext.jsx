import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CategoriesContext = createContext()

const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food' },
  { id: 'transport', name: 'Transport' },
  { id: 'housing', name: 'Housing' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'other', name: 'Other' }
]

export function CategoriesProvider ({ children }) {
  const [categories, setCategories] = useLocalStorage('categories', DEFAULT_CATEGORIES)

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories () {
  return useContext(CategoriesContext)
}
