import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TransactionsProvider } from './context/TransactionsContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { BudgetProvider } from './context/BudgetContext'
import Layout from './layouts/Layout'
import './App.css'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'))
const BudgetPage = lazy(() => import('./pages/BudgetPage'))

function App () {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <TransactionsProvider>
          <BudgetProvider>
            <BrowserRouter>
              <Suspense fallback={<div className="loading-spinner">Loading application...</div>}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path='transactions' element={<TransactionsPage />} />
                    <Route path='budget' element={<BudgetPage />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </BudgetProvider>
        </TransactionsProvider>
      </CategoriesProvider>
    </ThemeProvider>
  )
}

export default App
