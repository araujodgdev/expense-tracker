import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import {clerkMiddleware, getAuth} from '@hono/clerk-auth'
import { authRoutes } from './routes/auth'

const app = new Hono()

app.use(logger())
app.use('*', clerkMiddleware())

const apiRoutes = app.basePath('/api').route('/expenses', expensesRoute).route('', authRoutes)

app.use('*', serveStatic({root: './frontend/dist'}))
app.get('*', serveStatic({path: './frontend/dist/index.html'}))

export default app
export type ApiRoutes = typeof apiRoutes