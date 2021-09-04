import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from 'semantic-ui-react';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';

const MovieDetailsPage = () => {
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
            {movie.map(item => (
                <li key={item.id}>
                    <h2>{item.original_title}</h2>
                    <span>{item.overview}</span>
                </li>
            ))}
        </Container>
    );
};
export default MovieDetailsPage;
