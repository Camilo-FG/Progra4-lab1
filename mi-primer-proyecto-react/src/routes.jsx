import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import SaludoElian from './Components/SaludoElian.jsx';
import QuizComponent from './Components/QuizComponent.jsx';
import BuscarPokemon from './Components/BuscarPokemon.jsx';

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                    <Link to="/">Inicio</Link>
                    <Link to="/quiz">Quiz</Link>
                    <Link to="/buscar-pokemon">Buscar Pokemon</Link>
                </nav>

                <section id="enter">
                    <Outlet />
                </section>
            </>
        )
    },
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: SaludoElian,
})

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/quiz',
    component: QuizComponent,
})

const buscarPokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/buscar-pokemon',
    component: BuscarPokemon,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    quizRoute,
    buscarPokemonRoute
])

export const router = createRouter({ routeTree })