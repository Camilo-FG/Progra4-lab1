import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import SaludoDaniel from './Components/SaludoDaniel'
import QuizComponent from './Components/QuizComponent'
import BuscarPokemon from './Components/BuscarPokemon'

import './App.css'

const RootRoute = createRootRoute({                         
    component: function RootLayout() {                     
        return (
            <>
                <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                    <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
                        Inicio
                    </Link>
                    <Link to="/quiz" activeProps={{ style: { fontWeight: 'bold' } }}> 
                        Quiz
                    </Link>
                    <Link to="/pokemon" activeProps={{ style: { fontWeight: 'bold' } }}>
                        Pokémon
                    </Link>
                </nav>

                <section id='center'>
                    <Outlet />
                </section>
            </>
        )
    },
})

const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/',
    component: SaludoDaniel,
})

const quizRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/quiz',
    component: QuizComponent,
})

const PokemonRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/pokemon',
    component: BuscarPokemon,
})



const routeTree = RootRoute.addChildren([indexRoute, quizRoute, PokemonRoute])

export const router = createRouter({
    routeTree,
})
