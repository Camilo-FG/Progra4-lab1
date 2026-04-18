import { createRootRoute,createRoute,createRouter,Link,Outlet } from "@tanstack/react-router"
import  Quiz from "./Quiz/Quiz"
import saludoKeril from "./Components/SaludoKeril "

const Root = createRootRoute({
component: function RootLayout(){
    return (
        <>
        <nav>
            <Link to="/">saludo</Link>
            <br />
            <Link to="/Cuestionario">Cuestionario</Link>
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
    path: "/Cuestionario",
    component: Quiz,
})

const saludoPage = createRoute({
    getParentRoute: () => Root,
    path: "/",
    component: saludoKeril,
})
const routeTree = Root.addChildren([CuestionarioPage, saludoPage])

export const router = createRouter({routeTree})