import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';
import SearchBar from '../SearchBar/SearchBar';
import { Image, Icon } from 'semantic-ui-react';
import './MoviesPage.scss';
import emptyPoster from '../../images/empty-poster.png';

const MoviesPage = () => {
    const [queryHits, setQueryHits] = useState([]);
    const [searchQuery, setQuery] = useState('');

    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    const fetching = async (query, mountHits) => {
        API_OPTIONS.QUERY_TYPE = query;
        const response = await fetchMovies(searchQuery);
        mountHits([...response.results]);
    };

    useEffect(() => {
        if (!searchQuery) return;
        fetching('search/movie', setQueryHits);
    }, [searchQuery]);

    const handleOnSubmit = data => {
        setQuery(data);
        history.push({ ...location, search: `query=${data}` });
    };

    useEffect(() => {
        if (location.search === '') {
            return;
        }

        const newSearch = new URLSearchParams(location.search).get('query');
        setQuery(newSearch);
    }, [location.search]);

    return (
        <>
            <SearchBar handleOnSubmit={handleOnSubmit} />
            <ul className="movies-list">
                {queryHits &&
                    queryHits.map(movie => (
                        <li key={movie.id} className="movies-list__item">
                            <Link
                                to={`${url}/${movie.id}`}
                                className="movies-list__item-link"
                            >
                                <h2 className="movies-list__title">
                                    {movie.original_title ||
                                        movie.original_name}
                                </h2>
                                <Image
                                    src={
                                        movie.backdrop_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                                            : `${emptyPoster}`
                                    }
                                    alt=""
                                    width="500"
                                    className="movies-list__item-image"
                                />
                                <p className="movies-list__item-description">
                                    <span>
                                        Rating: {movie.vote_average}
                                        <Icon name="star" />
                                    </span>
                                    <span>
                                        Release date:
                                        {movie.release_date}
                                    </span>
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default MoviesPage;
