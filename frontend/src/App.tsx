import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch('/api/expenses/total-spent')
      const { result } = await res.json()
      setTotalSpent(result)
    }

    fetchTotalSpent()
  }, [])

  return (
    <div className='p-4'>
      <Card className="max-w-md m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount spent.</CardDescription>
        </CardHeader>
        <CardContent>
          ${' '}{totalSpent}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
