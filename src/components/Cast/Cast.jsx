import { useState, useEffect } from 'react';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';
import emptyImage from '../../empty-image.png';
import './Cast.scss';

const Cast = ({ movieID }) => {
    const [cast, setCast] = useState([]);

    const fetchCast = async movieID => {
        API_OPTIONS.QUERY_TYPE = `movie/${movieID}/credits`;
        const response = await fetchMovies();
        setCast([...response.cast]);
    };

    useEffect(() => {
        fetchCast(movieID);
    }, [movieID]);

    return (
        <>
            <h2>Cast of film</h2>
            <ul className="cast-list">
                {cast.map(item => (
                    <li key={item.id}>
                        <img
                            src={
                                item.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                    : `${emptyImage}`
                            }
                            alt=""
                            width="300"
                            height="300"
                        />
                        <h2>{item.name}</h2>
                        <span>{item.character}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Cast;
