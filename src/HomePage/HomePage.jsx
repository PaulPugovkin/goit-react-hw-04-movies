import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/more">More</NavLink>
            </nav>
        </div>
    );
};

export default HomePage;
