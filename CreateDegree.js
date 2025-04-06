import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';

function CreateDegree() {
  const [fullName, setFullName] = useState('');
  const [shortcode, setShortcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDegree = {
      full_name: fullName,
      shortcode: shortcode,
    };

    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDegree),
    })
      .then(res => res.json())
      .then(() => {
        navigate('/Degrees');
      })
      .catch(err => console.error('Error creating degree:', err));
  };

  return (
    <Template>
      <div className="container mt-4">
        <h1>Create New Degree</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Degree Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="fullName" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="shortcode" className="form-label">Degree Code</label>
            <input 
              type="text" 
              className="form-control" 
              id="shortcode" 
              value={shortcode} 
              onChange={(e) => setShortcode(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Create Degree</button>
        </form>
      </div>
    </Template>
  );
}

export default CreateDegree;