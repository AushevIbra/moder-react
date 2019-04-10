import React from 'react';
import {SignInLink} from "./signInLinks";
import {SignOutLinks} from "./signOutLinks";
import { connect } from "react-redux";
import logo from '../../logo.svg';
const NavBar = ({auth}) => {
    return (
        <nav className="navbar-expand-lg navbar navbar-light bg-light">
            <a className="navbar-brand" href="#"><img src={logo} alt=""/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                {auth == false
                    ?
                    null
                    :
                    <SignInLink/>
                }



                <span className="navbar-text">

                </span>
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    }
};
export default connect(mapStateToProps)(NavBar)
