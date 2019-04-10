import React, {useEffect, useReducer} from 'react';
import {TenderList} from "./tenderList";
import {connect} from "react-redux";
import {authActions} from "../../store/actions/auth";
import {Redirect} from 'react-router-dom';
import axios from '../../config/axios';
import './tenders.css';

const initialState = {
    tender: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {tender: action.payload};
        default:
            throw new Error('Unexpected action');
    }
};
const Tenders = ({auth}) => {
    useEffect(() => {
        document.title = 'Тендеры';
    })
    const [state, dispatch] = useReducer(reducer, initialState);

    const getTender = () => {
        axios.get('/v1/tenderGet')
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

    const changeModStatus = mod  => {
        let params = new URLSearchParams();
        params.append('id', state.tender.id);
        params.append('mod_status', mod);

        axios.post('/v1/tenderUpdate', params)
            .then(response => {
                getTender();
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
                state.tender === null

                    ?
                    <button className="btn btn-primary" onClick={getTender}>Получить</button>

                    :

                    <div>
                        <TenderList tender={state.tender}/>
                        <div className="tender-actions">
                            <button className="btn btn-success" onClick={() => {changeModStatus('accept_mod')}}><i className="fa fa-check" aria-hidden="true"></i></button>
                            <button className="btn btn-danger" onClick={() => {changeModStatus('decline_mod')}}><i className="fa fa-times-circle" aria-hidden="true"></i>
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

export default connect(mapStateToProps, {...authActions})(Tenders);
