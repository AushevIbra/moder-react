import React from 'react';
import { NavLink } from 'react-router-dom';
const SignInLink = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink to="/tenders" className="nav-link" activeClassName="active">Тендеры</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/vacancy" className="nav-link" activeClassName="active">Вакансии</NavLink>
            </li>

        </ul>
    )
}

export { SignInLink }
