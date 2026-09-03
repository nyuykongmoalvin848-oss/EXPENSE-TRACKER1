import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TransactionsProvider } from './context/TransactionsContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { BudgetProvider } from './context/BudgetContext'
import Home from './pages/Home'
import Stats from './pages/Stats'
import './App.css'

function App () {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <BudgetProvider>
          <TransactionsProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/stats' element={<Stats />} />
              </Routes>
            </BrowserRouter>
          </TransactionsProvider>
        </BudgetProvider>
      </CategoriesProvider>
    </ThemeProvider>
  )
}

export default App