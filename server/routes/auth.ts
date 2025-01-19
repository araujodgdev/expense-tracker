import { Hono } from "hono";
import { getAuth } from "@hono/clerk-auth";

export const authRoutes = new Hono()
    .get('/login', (c) => {
        const auth = getAuth(c)

        if(!auth?.userId) {
            return c.json({
                message: 'You\'re not logged in.'
            })
        }

        return c.json({
            message: 'You are logged in!',
            userId: auth.userId
        })
    })

export type AuthRouteType = typeof authRoutes