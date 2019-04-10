import React, {useEffect, useReducer} from 'react';
import {VacancyList} from "./vacancyList";
import {connect} from "react-redux";
import {authActions} from "../../store/actions/auth";
import {Redirect} from 'react-router-dom';
import axios from '../../config/axios';
import './vacancy.css';

const initialState = {
    vacancy: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {vacancy: action.payload};
        default:
            throw new Error('Unexpected action');
    }
};
const Vacancy = ({auth}) => {
    useEffect(() => {
        document.title = 'Вакансии';
    })
    const [state, dispatch] = useReducer(reducer, initialState);

    const getVacancy = () => {
        axios.get('/v1/jobGet')
            .then(response => {
                if (response.data.hasOwnProperty('message')) {
                    alert(response.data.message)
                } else {
                    dispatch({type: "add", payload: response.data})
                }
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    const changeModStatus = mod => {
        let params = new URLSearchParams();
        params.append('id', state.vacancy.id);
        params.append('mod_status', mod);

        axios.post('/v1/jobUpdate', params)
            .then(response => {
                dispatch({type:"add", payload: null})
                getVacancy();
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    if (!auth)
        return <Redirect to="/login"/>
    return (
        <div className='container flexbox-wrapper'>

            {
                state.vacancy === null

                    ?
                    <button className="btn btn-primary" onClick={getVacancy}>Получить</button>

                    :

                    <div>
                        <VacancyList vacancy={state.vacancy}/>
                        <div className="tender-actions">
                            <button className="btn btn-success" onClick={() => {
                                changeModStatus('accept_mod')
                            }}><i className="fa fa-check" aria-hidden="true"></i></button>
                            <button className="btn btn-danger" onClick={() => {
                                changeModStatus('decline_mod')
                            }}><i className="fa fa-times-circle" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>


            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    }
};

export default connect(mapStateToProps, {...authActions})(Vacancy);
