import NavBar from "./components/navbar"
import { Outlet } from "react-router-dom"

export function Layout(){
    return(
        <>
        <NavBar/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}