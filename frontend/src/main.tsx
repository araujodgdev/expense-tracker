import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider appearance={{baseTheme: dark}} publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
)
