import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';

function CreateCohort() {
  const [cohortName, setCohortName] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [degrees, setDegrees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(res => res.json())
      .then(data => setDegrees(data))
      .catch(err => console.error('Error fetching degrees:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const degreeUrl = `http://127.0.0.1:8000/api/degree/${degree}/`;
    const cohortId = `${degree}${year}`;

    const newCohort = {
      id: cohortId,
      name: cohortName,
      degree: degreeUrl,
      year: year,
    };

    fetch('http://127.0.0.1:8000/api/cohort/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCohort),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.id) {
          navigate('/cohorts');
        } else {
          console.error('Error creating cohort:', data);
        }
      })
      .catch(err => {
        console.error('Error creating cohort:', err);
      });
  };

  return (
    <Template>
      <div className="container mt-4">
        <h1>Create New Cohort</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cohortName" className="form-label">Cohort Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="cohortName" 
              value={cohortName} 
              onChange={(e) => setCohortName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="degree" className="form-label">Degree Shortcode</label>
            <select 
              id="degree" 
              className="form-select" 
              value={degree} 
              onChange={(e) => setDegree(e.target.value)} 
              required
            >
              <option value="">Select a degree</option>
              {degrees.map((deg) => (
                <option key={deg.id} value={deg.shortcode}>
                  {deg.full_name} ({deg.shortcode})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input 
              type="number" 
              className="form-control" 
              id="year" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Create Cohort</button>
        </form>
      </div>
    </Template>
  );
}

export default CreateCohort;