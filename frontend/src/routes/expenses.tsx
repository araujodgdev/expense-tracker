import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/expenses')({
    component: Expenses,
})

async function getAllExpenses() {
    const res = await api.expenses.$get()
    if (!res.ok) {
        throw new Error('Server error on fetching expenses')
    }
    const data = await res.json()
    return data.expenses
}

function Expenses() {
    const { isPending, error, data } = useQuery({ queryKey: ['get-all-expenses'], queryFn: getAllExpenses })

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <Table className='max-w-xl m-auto'>
                <TableCaption>A list of your expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending
                        ? Array(3).fill(0).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium"><Skeleton className="h-5" /></TableCell>
                                <TableCell><Skeleton className="h-5" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-5" /></TableCell>
                            </TableRow>
                        ))
                        : data.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell className="font-medium">{e.id}</TableCell>
                                <TableCell>{e.title}</TableCell>
                                <TableCell className="text-right">${e.amount}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
