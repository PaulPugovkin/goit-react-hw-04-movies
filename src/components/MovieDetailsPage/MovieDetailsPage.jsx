import { lazy, useEffect, useState } from 'react';
import {
    Route,
    Switch,
    useLocation,
    useParams,
    useRouteMatch,
} from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';
import './MovieDetailsPage.scss';

const Cast = lazy(() => import('../Cast/Cast.jsx'));
const Reviews = lazy(() => import('../Reviews/Reviews.jsx'));

const MovieDetailsPage = () => {
    const { url, path } = useRouteMatch();
    const { movieID } = useParams();

    const [movie, setMovie] = useState([]);
    const [comeFrom, setComeFrom] = useState('');

    const location = useLocation();

    const fetching = async (query, mountHits) => {
        API_OPTIONS.QUERY_TYPE = query;
        const response = await fetchMovies();
        mountHits([{ ...response }]);
    };

    useEffect(() => {
        fetching(`movie/${movieID}`, setMovie);
    }, [movieID]);

    useEffect(() => {
        setComeFrom(location?.state?.search ?? location?.state?.from ?? '/');
    }, [location.state]);

    return (
        <Container>
            <Link to={comeFrom}>Go back</Link>
            <ul className="movie-detail-list">
                {movie?.map(item => (
                    <li key={item.id} className="movie-detail-item">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                            alt=""
                            width="500"
                            className="movie-detail-item__image"
                        />
                        <div className="movie-description">
                            <h2>{item.original_title}</h2>
                            <p className="movie-description__overview">
                                {item.overview}
                            </p>
                            {item.genres && (
                                <p>
                                    {item.genres.map(genre => (
                                        <span
                                            key={genre.id}
                                            className="movie-description__genre"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </p>
                            )}
                            <div className="about-links">
                                <Link
                                    to={{
                                        pathname: `${url}/cast`,
                                        state: {
                                            search: `${comeFrom}`,
                                            from: `${comeFrom}`,
                                        },
                                    }}
                                    className="about-links__item"
                                >
                                    Cast
                                </Link>
                                <Link
                                    to={{
                                        pathname: `${url}/review`,
                                        state: {
                                            search: `${comeFrom}`,
                                            from: `${comeFrom}`,
                                        },
                                    }}
                                    className="about-links__item"
                                >
                                    Review
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Switch>
                <Route path={`${path}/cast`}>
                    <Cast movieID={movieID} />
                </Route>
                <Route path={`${path}/review`}>
                    <Reviews movieID={movieID} />
                </Route>
            </Switch>
        </Container>
    );
};
export default MovieDetailsPage;
