import StatCards from './StatCards'
import Charts from './Charts'

function Dashboard ({ transactions }) {
  return (
    <section className='dashboard'>
      <StatCards transactions={transactions} />
      <Charts transactions={transactions} />
    </section>
  )
}

export default Dashboard
