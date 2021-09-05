import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';

const MovieDetailsPage = () => {
    const { url } = useRouteMatch();
    const { movieID } = useParams();
    const [movie, setMovie] = useState([]);

    const fetching = async (query, mountHits) => {
        API_OPTIONS.QUERY_TYPE = query;
        const response = await fetchMovies();
        mountHits([{ ...response }]);
    };

    useEffect(() => {
        fetching(`movie/${movieID}`, setMovie);
    }, [movieID]);

    return (
        <Container>
            {movie?.map(item => (
                <li key={item.id}>
                    <h2>{item.original_title}</h2>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        alt=""
                    />
                    <span>{item.overview}</span>
                    <Link to={`${url}/cast`}>Cast</Link>
                    <Link to={`${url}/review`}>Review</Link>
                </li>
            ))}
        </Container>
    );
};
export default MovieDetailsPage;
