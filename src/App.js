import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Tenders from "./components/tenders/tenders";
import Vacancy from "./components/vacancy/vacancy";
import SignIn from "./components/auth/signIn";
import Main from "./components/main_page/main";
import {connect} from "react-redux";
import {authActions} from "./store/actions/auth";
import axios from "./config/axios";

const App = ({setAuth}) => {
    useEffect(() => {
        let token = localStorage.getItem('token');
        let param = new URLSearchParams();
        param.append('token', token);
        axios.post('/auth/check', param)
            .then(response => {
                setAuth(true);
            })
            .catch(errors => {
                console.log(errors)
            })
    })
    return (
        <Router>
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/login" component={SignIn}/>
                    <Route exact path="/tenders" component={Tenders}/>
                    <Route exact path="/vacancy" component={Vacancy} />
                </Switch>
            </div>
        </Router>
    );
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    }
};


export default connect(mapStateToProps, {...authActions})(App)
