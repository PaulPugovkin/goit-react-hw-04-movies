import { Link, useRouteMatch } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';
import './MoviesPage.scss';
import emptyPoster from '../../empty-poster.png';

const MoviesPage = ({ hits }) => {
    const { url } = useRouteMatch();

    return (
        <ul className="movies-list">
            {hits.map(movie => (
                <li key={movie.id} className="movies-list__item">
                    <Link
                        to={`${url}/${movie.id}`}
                        className="movies-list__item-link"
                    >
                        <h2 className="movies-list__title">
                            {movie.original_title || movie.original_name}
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
    );
};

export default MoviesPage;
