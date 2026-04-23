

import{
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,

} from '@tanstack/react-router'

import SaludoAndrey from './Components/SaludoAndrey'
import BuscarPokemon from './Components/BuscarPokemonA'
import QuizComponentAndrey from './Components/QuizComponentAndrey'
import './App.css'

const RootRoute = createRootRoute({
    component: function RootLayout(){
        return(
            <>
            <nav style={{display: 'flex', gap: '1rem', padding: '1rem'}}>
                <Link to="/" activeProps={{style: {fontWeight: 'bold'}}}>
                Inicio
                </Link>
                <Link to="/quiz" activeProps={{style: { fontWeight: 'bold'}}}> 
                Quiz
 
                </Link>
                <Link to="/Pokemon" activeProps={{style: { fontWeight: 'bold'}}}>
                Buscar Pokemon
                </Link>
            </nav>
            <section id="center">
                <Outlet />
            </section>

            </>
            )
        },
})


const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/',
    component: SaludoAndrey,
})

const quizRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/quiz',
    component: QuizComponentAndrey,
})

const pokemonRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/Pokemon',
    component: BuscarPokemon,
})


const routeTree = RootRoute.addChildren([indexRoute, quizRoute, pokemonRoute])

export const router = createRouter({
    routeTree,
})