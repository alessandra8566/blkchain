import { cn } from "@/utils/shadcn"
import { lazy } from "react"
import { Outlet } from "react-router-dom"

const Nav = lazy(() => import("./nav"))

function AuthLayout() {
  return (
    <div className={cn("flex flex-col h-screen")}>
      <Nav />
      <main className={cn(`relative z-0 flex-grow overflow-y-auto bg-main p-4`)}>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
