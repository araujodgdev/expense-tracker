import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


export const Route = createRootRoute({
  component: Root,
})

function NavBar() {
  return (
    <nav className="p-3 flex justify-between gap-2">
      <div className='flex gap-2'>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to='/expenses' className='[&.active]:font-bold'>
          Expenses
        </Link>
        <Link to='/create-expense' className='[&.active]:font-bold'>
          Create
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}