import { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import fetchMovies, { API_OPTIONS } from './services/api-movie';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));

function App() {
    const [popularHits, setPopularHits] = useState([]);

    const fetching = async (query, mountHits) => {
        API_OPTIONS.QUERY_TYPE = query;
        const response = await fetchMovies();
        mountHits([...response.results]);
    };

    // Fetch popular films
    useEffect(() => fetching('trending/all/day', setPopularHits), []);

    return (
        <Container>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/">
                        <HomePage hits={popularHits} />
                    </Route>
                    <Route exact path="/movies">
                        <MoviesPage />
                    </Route>
                    <Route path="/movies/:movieID">
                        <MovieDetailsPage />
                    </Route>
                    <Route>
                        <h2>404 Oops!</h2>
                    </Route>
                </Switch>
            </Suspense>
        </Container>
    );
}

export default App;
