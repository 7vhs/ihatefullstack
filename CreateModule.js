import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';

function CreateModule() {
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedCohorts, setSelectedCohorts] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(res => res.json())
      .then(data => setDegrees(data))
      .catch(err => console.error('Error fetching degrees:', err));

    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(res => res.json())
      .then(data => setCohorts(data))
      .catch(err => console.error('Error fetching cohorts:', err));
  }, []);

  const handleDegreeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDegrees(prevDegrees => 
      checked ? [...prevDegrees, value] : prevDegrees.filter(degree => degree !== value)
    );
  };

  const handleCohortChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCohorts(prevCohorts => 
      checked ? [...prevCohorts, value] : prevCohorts.filter(cohort => cohort !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cohortUrls = selectedCohorts.map(cohortId => {
      const cohort = cohorts.find(cohort => cohort.id === cohortId);
      return cohort ? `http://127.0.0.1:8000/api/cohort/${cohort.id}/` : null;
    }).filter(url => url !== null);

    const newModule = {
      code: code,
      full_name: fullName,
      degree: selectedDegrees,
      delivered_to: cohortUrls,
    };

    fetch('http://127.0.0.1:8000/api/module/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newModule),
    })
      .then(res => res.json())
      .then(() => {
        navigate('/modules');
      })
      .catch(err => console.error('Error creating module:', err));
  };

  return (
    <Template>
      <div className="container mt-4">
        <h1>Create New Module</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="moduleCode" className="form-label">Module Code</label>
            <input
              type="text"
              className="form-control"
              id="moduleCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="moduleFullName" className="form-label">Module Full Name</label>
            <input
              type="text"
              className="form-control"
              id="moduleFullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Degrees</label>
            <div>
              {degrees.map(degree => (
                <div key={degree.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={degree.id}
                    onChange={handleDegreeChange}
                    id={`degree-${degree.id}`}
                  />
                  <label className="form-check-label" htmlFor={`degree-${degree.id}`}>
                    {degree.full_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Cohorts</label>
            <div>
              {cohorts.map(cohort => (
                <div key={cohort.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={cohort.id}
                    onChange={handleCohortChange}
                    id={`cohort-${cohort.id}`}
                  />
                  <label className="form-check-label" htmlFor={`cohort-${cohort.id}`}>
                    {cohort.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Create Module</button>
        </form>
      </div>
    </Template>
  );
}

export default CreateModule;