import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';

function SetGrades() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [cohortId, setCohortId] = useState('');
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [caMark, setCaMark] = useState('');
  const [examMark, setExamMark] = useState('');
  const [totalGrade, setTotalGrade] = useState('');

  const navigate = useNavigate();

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  useEffect(() => {
    if (studentId) {
      fetch(`http://127.0.0.1:8000/api/student/${studentId}/`)
        .then(res => res.json())
        .then(data => {
          console.log('Student Data:', data);

          if (data.cohort) {
            const cohortIdExtracted = data.cohort.split('/').slice(-2, -1)[0];
            setStudent(data);
            setCohortId(cohortIdExtracted);  // Update cohortId state
            console.log('Cohort ID:', cohortIdExtracted);
          } else {
            console.error("Student doesn't have a cohort");
          }
        })
        .catch(err => {
          console.error('Error fetching student:', err);
        });
    }
  }, [studentId]);

  useEffect(() => {
    if (cohortId) {
      fetch('http://127.0.0.1:8000/api/module/')
        .then(res => res.json())
        .then(data => {
          const filteredModules = data.filter(module =>
            module.delivered_to.some(cohortUrl => cohortUrl.includes(cohortId))
          );
          setModules(filteredModules);
        })
        .catch(err => {
          console.error('Error fetching modules:', err);
        });
    }
  }, [cohortId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedModule && caMark >= 0 && caMark <= 100 && examMark >= 0 && examMark <= 100) {
      const total = parseFloat(caMark) + parseFloat(examMark);
      setTotalGrade(total);

      const gradeData = {
        module: `http://127.0.0.1:8000/api/module/${selectedModule}/`,
        ca_mark: caMark,
        exam_mark: examMark,
        total_grade: total,
        student: `http://127.0.0.1:8000/api/student/${studentId}/`,
        cohort: `http://127.0.0.1:8000/api/cohort/${cohortId}/`,
      };

      fetch('http://127.0.0.1:8000/api/grade/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gradeData),
      })
        .then(res => res.json())
        .then((data) => {
          if (data.id) {
            navigate(`/students/${studentId}`);
          } else {
            console.error('Error updating grade:', data);
          }
        })
        .catch(err => {
          console.error('Error updating grade:', err);
        });
    } else {
      alert('Please enter marks between 0 and 100.');
    }
  };

  return (
    <Template>
      <div className="container mt-4">
        <h1>Set Grade for Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Student ID</label>
            <input 
              type="text" 
              className="form-control" 
              id="studentId" 
              value={studentId} 
              onChange={handleStudentIdChange} 
              required 
            />
          </div>

          {student && (
            <>
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Student Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="studentName" 
                  value={`${student.first_name} ${student.last_name}`} 
                  disabled 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="module" className="form-label">Module</label>
                <select 
                  id="module" 
                  className="form-select" 
                  value={selectedModule} 
                  onChange={(e) => setSelectedModule(e.target.value)} 
                  required
                >
                  <option value="">Select a module</option>
                  {modules.length > 0 ? (
                    modules.map((module) => (
                      <option key={module.code} value={module.code}>
                        {module.full_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No modules available</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="caMark" className="form-label">CA Mark (0-100)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="caMark" 
                  value={caMark} 
                  onChange={(e) => setCaMark(e.target.value)} 
                  min="0" max="100" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="examMark" className="form-label">Exam Mark (0-100)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="examMark" 
                  value={examMark} 
                  onChange={(e) => setExamMark(e.target.value)} 
                  min="0" max="100" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="totalGrade" className="form-label">Total Grade</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="totalGrade" 
                  value={totalGrade} 
                  disabled 
                />
              </div>

              <button type="submit" className="btn btn-primary">Set Grade</button>
            </>
          )}
        </form>
      </div>
    </Template>
  );
}

export default SetGrades;