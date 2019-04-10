import React from 'react';
import './vacancy.css';
const VacancyList = ({vacancy}) => {
    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{vacancy.name}</h5>
                    <small className="card-subtitle mb-2 text-muted">Опубликовано: {vacancy.post_date}</small>
                    <p className="card-text">{vacancy.description}</p>
                    <a href={vacancy.out_link} className="card-link" target="_blank">Перейти к вакансии</a>
                </div>
            </div>
        </div>
    )
}

export { VacancyList }
