import { Hono } from "hono";
import { z } from 'zod'
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
    id: z.number().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().positive()
})

const createExpenseSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

let fakeExpenses: Expense[] = [
    { id: 1, title: 'Groceries', amount: 50.00 },
    { id: 2, title: 'Utilities', amount: 100.00 },
    { id: 3, title: 'Rent', amount: 1000.00 },
]

export const expensesRoute = new Hono()
    .get("/", c => c.json({ expenses: fakeExpenses }))
    .get('/total-spent', c => {
        const totalSpent = fakeExpenses.reduce((acc, crr) => (acc + crr.amount), 0)
        c.status(200)
        return c.json({result: totalSpent})
    })
    .post('/', zValidator('json', createExpenseSchema), (c) => {
        const data = c.req.valid('json');
        fakeExpenses.push({ id: fakeExpenses.length + 1, ...data })
        c.status(201)
        return c.json({})
    })
    .get('/:id{[0-9]+}', (c) => {
        const { id } = c.req.param()
        const expense = fakeExpenses.find(e => e.id === Number.parseInt(id))
        if (!expense) {
            return c.notFound()
        }
        return c.json({ result: expense })
    })
    .delete('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const index = fakeExpenses.findIndex(e => e.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const deletedExpenses = fakeExpenses.splice(index, 1)
        return c.json({ deletedExpenses })
    })
    .put('/:id{[0-9]+}', zValidator('json', createExpenseSchema), (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const index = fakeExpenses.findIndex(e => e.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const data = c.req.valid('json')
        fakeExpenses[index] = { id, ...data }
        return c.json({ result: fakeExpenses[index] })
    })
