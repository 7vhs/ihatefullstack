import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import { Link } from 'react-router-dom';

function Degrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => {
        console.log("API Data:", data);  // Debugging
        setDegrees(data);
      })
      .catch(error => console.error('Error fetching degrees:', error));
  }, []);

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">Degrees</h1>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Degree Name</th>
              <th>Course Code</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {degrees.map((degree) => (
              <tr key={degree.shortcode}>
                <td>{degree.full_name}</td>
                <td>{degree.shortcode}</td>
                <td>
                  <Link to={`/degrees/${degree.shortcode}`} className="btn btn-outline-primary btn-sm">
                    View Degree
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}

export default Degrees;