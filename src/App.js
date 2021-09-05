import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import fetchMovies, { API_OPTIONS } from './services/api-movie';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation/Navigation';
import SearchBar from './components/SearchBar/SearchBar';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';

function App() {
    const [searchQuery, setQuery] = useState('');
    const [popularHits, setPopularHits] = useState([]);
    const [queryHits, setQueryHits] = useState([]);

    const fetching = async (query, mountHits) => {
        API_OPTIONS.QUERY_TYPE = query;
        const response = await fetchMovies(searchQuery);
        mountHits([...response.results]);
    };

    // Fetch popular films
    useEffect(() => fetching('trending/all/day', setPopularHits), []);

    // Fetch by user query
    useEffect(() => {
        if (!searchQuery) return;
        fetching('search/movie', setQueryHits);
    }, [searchQuery]);

    const handleOnSubmit = data => {
        setQuery(data);
    };

    return (
        <Container>
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <HomePage hits={popularHits} />
                </Route>
                <Route exact path="/movies">
                    <SearchBar handleOnSubmit={handleOnSubmit} />
                    {queryHits.length > 0 && <MoviesPage hits={queryHits} />}
                </Route>
                <Route path="/movies/:movieID">
                    <MovieDetailsPage />
                </Route>
                <Route>
                    <h2>404 Oops!</h2>
                </Route>
            </Switch>
        </Container>
    );
}

export default App;
