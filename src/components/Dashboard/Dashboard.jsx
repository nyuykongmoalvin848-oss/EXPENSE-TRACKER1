import { Suspense, lazy } from 'react'
import StatCards from './StatCards'
import Charts from './Charts'

const LazyCharts = lazy(() => import('./Charts'))

function Dashboard ({ transactions }) {
  return (
    <section className='dashboard'>
      <StatCards transactions={transactions} />
      <Suspense fallback={<p>Loading charts...</p>}>
        <LazyCharts transactions={transactions} />
      </Suspense>
    </section>
  )
}

export default Dashboard
