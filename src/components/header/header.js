import './header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1><NavLink to="/"><span>Algo</span>-Visualizer</NavLink></h1>
            <nav>
                <ul>
                    <li><NavLink activeClassName="active-nav-link" to="/sorting">Sorting</NavLink></li>
                    <li><NavLink activeClassName="active-nav-link" to="/searching">Searching</NavLink></li>
                </ul>
            </nav>
        </header>
    )}

export default Header;