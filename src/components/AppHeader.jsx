import {NavLink} from "react-router-dom";
import { useContext } from "react";
import GlobalLoaderContext from "../assets/context/GlobalLoaderContext";

export default function AppHeader() {
    const { loader, setLoader } = useContext(GlobalLoaderContext);
    const menu_items = [
        {name: "Movie List", path: "/"},
        {name: "Movie Details", path: "/movies/1"},
    ];
    return (
        <header className="app-header">
            <nav className="navbar-header">
                <h2>🎬 MovieDB</h2>
                <ul className="d-flex gap-4 justify-content-around list-unstyled">
                    {menu_items.map((item, index) => (
                        <li key={index} className="bg-dark text-white p-2 rounded">
                            <NavLink to={item.path}
                                className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <button 
                className={`header-button-${loader ? "on" : "off"}`}
                onClick={() => setLoader(!loader)}>Loader {loader ? ('on') : ('off')} </button>
            </nav>
            <div>
                <img  className="jumbotron" src="/src/assets/images/logo.jpg" alt="jumbotron" />
            </div>
        </header>
    );
}
