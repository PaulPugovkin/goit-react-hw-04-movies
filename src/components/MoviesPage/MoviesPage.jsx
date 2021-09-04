import { Link, useRouteMatch } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';
import './MoviesPage.scss';
const MoviesPage = ({ hits }) => {
    const { url } = useRouteMatch();

    return (
        <ul>
            {hits.map(movie => (
                <li key={movie.id} className="movie-list__item">
                    <Link to={`${url}/${movie.id}`}>
                        <h2>{movie.original_title || movie.original_name}</h2>
                        {movie.backdrop_path !== null ? (
                            <>
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt=""
                                />
                                <span>
                                    Rating: {movie.vote_average}
                                    <Icon name="star" />
                                </span>
                                <span>
                                    Release date:
                                    {movie.release_date}
                                </span>
                            </>
                        ) : (
                            <h3>Netu kartinki</h3>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MoviesPage;
