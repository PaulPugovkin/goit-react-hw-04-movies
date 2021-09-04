import { Container, Image } from 'semantic-ui-react';

const HomePage = ({ hits }) => {
    return (
        <Container>
            <ul>
                {hits.length > 0 &&
                    hits.map(movie => {
                        return (
                            <li key={movie.id}>
                                <h2>
                                    {movie.original_title ||
                                        movie.original_name}
                                </h2>

                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt=""
                                />

                                <p>{movie.overview}</p>
                            </li>
                        );
                    })}
            </ul>
        </Container>
    );
};

export default HomePage;
