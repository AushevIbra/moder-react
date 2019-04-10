import React, {useState} from 'react';
import axios from "../../config/axios";
import {connect} from "react-redux";
import {authActions} from "../../store/actions/auth";
import {Redirect} from 'react-router-dom';
import './main.css';

const Main = ({setAuth, auth}) => {
    if (auth == true)
        return <Redirect to="/tenders"/>

    return <Redirect to="/login"/>
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    }
};


export default connect(mapStateToProps, {...authActions})(Main)