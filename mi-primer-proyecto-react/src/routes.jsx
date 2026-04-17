import { createRootRoute,createRoute,createRouter,Link,Outlet } from "@tanstack/react-router"
import  Quiz from "./Quiz/Quiz"


const Root = createRootRoute({
component: function RootLayout(){
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <br />
            <Link to="/Cuestonario">Cuestionario</Link>
        </nav>

        <section id="center">
            <Outlet />
        </section>
        </>
    )
}
})

const CuestionarioPage = createRoute({
    getParentRoute: () => Root,
    path: "/Cuestonario",
    component: Quiz,
})

const routeTree = Root.addChildren([CuestionarioPage])

export const router = createRouter({routeTree})