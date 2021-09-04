export const API_OPTIONS = {
    BASE_URL: 'https://api.themoviedb.org/3/',
    API_KEY: '0824efbb25a139578f48e1b53195eb63',
    PAGE: 1,
    PER_PAGE: 12,
    QUERY_TYPE: '',
};

async function fetchMovies(query) {
    const url = query
        ? `${API_OPTIONS.BASE_URL}${API_OPTIONS.QUERY_TYPE}?api_key=${API_OPTIONS.API_KEY}&query=${query}`
        : `${API_OPTIONS.BASE_URL}${API_OPTIONS.QUERY_TYPE}?api_key=${API_OPTIONS.API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
}
export default fetchMovies;
