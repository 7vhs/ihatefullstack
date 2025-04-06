import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Template from '../components/Template';

function ModulesForCohort() {
  const { cohortCode } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cohortCode) {
      // Fetch all modules
      fetch('http://127.0.0.1:8000/api/module/')
        .then(response => response.json())
        .then(data => {
          // Filter modules by cohort
          const filteredModules = data.filter(module => 
            module.delivered_to.some(url => {
              // Remove trailing slash and then split by '/' to extract the cohort code
              const cohortInUrl = url.replace(/\/$/, '').split('/').pop();
              return cohortInUrl === cohortCode;
            })
          );
          setModules(filteredModules);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching modules:', error);
          setLoading(false);
        });
    } else {
      console.error('No cohort code found in the URL!');
      setLoading(false);
    }
  }, [cohortCode]);

  if (loading) return <p>Loading modules...</p>;

  if (modules.length === 0) return <p>No modules found for this cohort.</p>;

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">Modules Delivered to {cohortCode}</h1>

        <hr />

        <h2>Modules List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Module Code</th>
              <th>Module Full Name</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(module => (
              <tr key={module.code}>
                <td>{module.code}</td>
                <td>{module.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}

export default ModulesForCohort;