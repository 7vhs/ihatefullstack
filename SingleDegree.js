import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Template from '../components/Template';

function SingleDegree() {
  const { shortcode } = useParams();
  const [degree, setDegree] = useState(null);
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/${shortcode}/`)
      .then(response => response.json())
      .then(data => setDegree(data))
      .catch(error => console.error("Error fetching degree:", error));

    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error("Error fetching cohorts:", error));
  }, [shortcode]);

  if (!degree) return <p>Loading degree details...</p>;

  return (
    <Template>
    <div className="container mt-4">
      <h1 className="mb-4">{degree.full_name} <small className="text-muted">({degree.shortcode})</small></h1>
      <hr />
      <h2>Cohorts <span className="badge bg-secondary">{cohorts.length}</span></h2>
      {cohorts.length === 0 ? (
        <p>No cohorts found for this degree.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Cohort Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort) => (
              <tr key={cohort.id}>
                <td>{cohort.name}</td>
                <td>
                <Link to={`/cohorts/${cohort.id}`} className="btn btn-outline-primary btn-sm">
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

export default SingleDegree;