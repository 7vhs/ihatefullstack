import React, { useState, useEffect } from 'react';
import Template from '../components/Template';
import { Link } from 'react-router-dom';

function Modules() {
  const [modules, setModules] = useState([]);

  const fetchModules = () => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then(response => response.json())
      .then(data => setModules(data))
      .catch(error => console.error('Error fetching modules:', error));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">All Modules</h1>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Module Code</th>
              <th>Module Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.code}>
                <td>{module.code}</td>
                <td>{module.full_name}</td>
                <td>
                  <Link to={`/modules/${module.code}`} className="btn btn-outline-primary btn-sm">
                    View Module
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

export default Modules;