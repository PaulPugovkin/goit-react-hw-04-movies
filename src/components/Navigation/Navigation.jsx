import { NavLink } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './Navigation.scss';

const Navigation = () => {
    return (
        <Container className="header">
            <nav className="header-menu">
                <NavLink
                    exact
                    to="/"
                    activeClassName="header-menu__item-active"
                    className="header-menu__item"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    activeClassName="header-menu__item-active"
                    className="header-menu__item"
                >
                    Movies
                </NavLink>
            </nav>
        </Container>
    );
};

export default Navigation;
