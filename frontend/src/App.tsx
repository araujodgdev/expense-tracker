import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from './lib/api'
import { useQuery } from '@tanstack/react-query'

async function fetchTotalSpent() {
  // SIMULATES SERVER DELAY
  // const simulatedPending = new Promise((res) => {
  //   setTimeout(() => {
  //     res("foo")
  //   }, 1000)
  // })
  // await simulatedPending

  const res = await api.expenses['total-spent'].$get()
  if(!res.ok) {
    throw new Error('Server error on fetching total amount spent')
  }
  const data = await res.json()
  return data.result
}

function App() {
  const {isPending, error, data} = useQuery({queryKey: ['get-total-spent'], queryFn: fetchTotalSpent, retry: false})

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='p-4'>
      <Card className="max-w-md m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount spent.</CardDescription>
        </CardHeader>
        <CardContent>
          ${' '}{isPending ? '...' : data}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
