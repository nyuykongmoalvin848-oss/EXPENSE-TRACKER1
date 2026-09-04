import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TransactionsProvider } from './context/TransactionsContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { BudgetProvider } from './context/BudgetContext'
import Layout from './layouts/Layout'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import BudgetPage from './pages/BudgetPage'
import './App.css'

function App () {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <TransactionsProvider>
          <BudgetProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path='transactions' element={<TransactionsPage />} />
                  <Route path='budget' element={<BudgetPage />} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </BudgetProvider>
        </TransactionsProvider>
      </CategoriesProvider>
    </ThemeProvider>
  )
}

export default App
