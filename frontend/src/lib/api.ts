import { type ApiRoutes } from '@server/app'
import { hc } from 'hono/client'

const rpcClient = hc<ApiRoutes>('/')

export const api = rpcClient.api