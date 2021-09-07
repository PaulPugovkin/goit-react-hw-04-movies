import { Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = ({ hits }) => {
    return (
        <Container>
            <ul className="homepage-list">
                {hits.length > 0 &&
                    hits.map(movie => {
                        return (
                            <li key={movie.id} className="homepage-list__item">
                                <Link to={`movies/${movie.id}`}>
                                    <h2 className="homepage-list__title">
                                        {movie.original_title ||
                                            movie.original_name}
                                    </h2>

                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        alt=""
                                    />
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </Container>
    );
};

export default HomePage;
