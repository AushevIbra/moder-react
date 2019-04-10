import React from 'react';
import './tenders.css';
const TenderList = ({tender}) => {
    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{tender.name}</h5>
                    <small className="card-subtitle mb-2 text-muted">Дата публикации: {tender.start_date} | Дата окончания: {tender.end_date} </small>
                    <p className="card-text">{tender.description}</p>
                    <a href={tender.out_link} className="card-link" target="_blank">Перейти к тендеру</a>
                </div>
            </div>
        </div>
    )
}

export { TenderList }
