import React from 'react';
import {NavLink} from 'react-router-dom';

const SignOutLinks = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <NavLink to="/login" className="nav-link" activeClassName='active'>Войти</NavLink>
        </ul>
    )
}

export {SignOutLinks}
