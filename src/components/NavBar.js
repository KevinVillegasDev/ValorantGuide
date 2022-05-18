import { Link, Route, Routes } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/agents">Agents</Link>
            </nav>
        </div>
    );
};

export default NavBar;
