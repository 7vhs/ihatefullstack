import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';

function CreateStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    student_id: '',
    cohort: ''
  });

  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    // Fetch cohorts to populate the dropdown
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(res => res.json())
      .then(data => setCohorts(data))
      .catch(err => console.error('Error fetching cohorts:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to create student');
      return res.json();
    })
    .then(data => {
      // Redirect to the new student page
      navigate(`/students/${data.student_id}`);
    })
    .catch(err => console.error('Error creating student:', err));
  };

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-4">Create New Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input 
              className="form-control" 
              name="first_name" 
              value={formData.first_name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input 
              className="form-control" 
              name="last_name" 
              value={formData.last_name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input 
              className="form-control" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>Student ID</label>
            <input 
              className="form-control" 
              name="student_id" 
              value={formData.student_id} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>Cohort</label>
            <select 
              className="form-control" 
              name="cohort" 
              value={formData.cohort} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a cohort</option>
              {cohorts.map(cohort => (
                <option key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>
                  {cohort.id}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Create Student</button>
        </form>
      </div>
    </Template>
  );
}

export default CreateStudent;