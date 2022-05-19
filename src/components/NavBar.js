import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/agents">Agents</Link>
                <Link to="/weapons">Weapons</Link>
            </nav>
        </div>
    );
};

export default NavBar;
