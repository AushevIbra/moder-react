import React, {useState, useEffect} from 'react';
import axios from '../../config/axios';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {authActions} from "../../store/actions/auth";

const SignIn = ({auth, setAuth}) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }
    const handleChangePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password)
        axios.post('/auth/login', params)
            .then(response => {
                setError(null);
                localStorage.setItem('token', response.data.token);
                setAuth(true);
            })
            .catch(error => {
                setError(error.response.data.error)
                console.log()
            });
    }
    if (auth)
        return <Redirect to="/tenders"/>
    return (
        <div className="container">
            {error !== null
                ?
                <div className="alert alert-danger">
                    {error}
                </div>
                :
                null
            }
            <div className="flexbox-wrapper">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Почта</label>
                        <input onChange={handleChangeEmail} type="email" className="form-control"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Пароль</label>
                        <input onChange={handleChangePassword} type="password" className="form-control"
                               id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width: "100%"}}
                            onClick={handleSubmit}>Войти
                    </button>
                </form>
            </div>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    }
};

export default connect(mapStateToProps, {...authActions})(SignIn);
