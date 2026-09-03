import StatCards from './StatCards'
import Charts from './Charts'

function Dashboard ({ transactions, budgets }) {
  return (
    <div className='dashboard'>
      <StatCards transactions={transactions} budgets={budgets} />
      <Charts transactions={transactions} budgets={budgets} />
    </div>
  )
}

export default Dashboard