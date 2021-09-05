import { useState, useEffect } from 'react';
import fetchMovies, { API_OPTIONS } from '../../services/api-movie';
import './Reviews.scss';

const Reviews = ({ movieID }) => {
    const [reviews, setReviews] = useState([]);

    const fetchCast = async movieID => {
        API_OPTIONS.QUERY_TYPE = `movie/${movieID}/reviews`;
        const response = await fetchMovies();
        setReviews([...response.results]);
    };

    useEffect(() => {
        fetchCast(movieID);
    }, [movieID]);

    return (
        <>
            <h2 className="reviews-title">Film reviews</h2>
            <ul className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map(item => (
                        <li key={item.id}>
                            <h2>{item.author}</h2>
                            <span>{item.updated_at}</span>
                            <p>{item.content}</p>
                        </li>
                    ))
                ) : (
                    <h2>There is no reviews</h2>
                )}
            </ul>
        </>
    );
};

export default Reviews;
