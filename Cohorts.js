import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import { Link } from 'react-router-dom';

function Cohorts() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">All Cohorts</h1>
        <hr />
        {cohorts.length === 0 ? (
          <p>No cohorts found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Cohort Name</th>
                <th>Course Code</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map(cohort => (
                <tr key={cohort.id}>
                  <td>{cohort.name}</td>
                  <td>{cohort.degree.split('/').filter(Boolean).pop()}</td>
                  <td>
                    <Link
                      to={`/cohorts/${cohort.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Cohort
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Template>
  );
}

export default Cohorts;