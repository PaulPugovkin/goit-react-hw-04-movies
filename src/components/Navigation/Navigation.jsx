import { NavLink } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const Navigation = () => {
    return (
        <Container>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>
            </nav>
        </Container>
    );
};

export default Navigation;
