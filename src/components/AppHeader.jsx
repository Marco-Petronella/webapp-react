import {NavLink} from "react-router-dom";

export default function AppHeader() {
    const menu_items = [
        {name: "Home", path: "/"},
        {name: "Movie List", path: "/movies"},
        {name: "Movie Details", path: "/movies/:id"},
    ];
    return (
        <header>
            <nav>
                <ul className="d-flex gap-4 justify-content-around list-unstyled">
                    {menu_items.map((item, index) => (
                        <li key={index} className="bg-dark text-white p-2 rounded">
                            <NavLink to={item.path}
                                className={({isActive}) => (isActive ? "text-decoration-underline" : "")}>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
