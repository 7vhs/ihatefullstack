import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Template from '../components/Template';

function SingleStudent() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [modules, setModules] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        if (studentId) {
          fetch(`http://127.0.0.1:8000/api/student/${studentId}/`)
            .then(res => res.json())
            .then(dataFromStudent => {
              setStudent(dataFromStudent);
      
              fetch('http://127.0.0.1:8000/api/module/')
                .then(response => response.json())
                .then(allModules => {
                    const studentCohortCode = dataFromStudent.cohort.replace(/\/$/, '').split('/').pop(); // <-- FIXED
                  
                    const filteredModules = allModules.filter(module =>
                      module.delivered_to.some(url => {
                        const cohortInUrl = url.replace(/\/$/, '').split('/').pop();
                        return cohortInUrl === studentCohortCode;
                      })
                    );
                  
                    setModules(filteredModules);
                  })                  
                .catch(err => console.error('Error fetching modules:', err));
            })
            .catch(err => console.error('Error fetching student:', err));
      
          fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`)
            .then(res => res.json())
            .then(data => setGrades(data))
            .catch(err => console.error('Error fetching grades:', err));
        }
      }, [studentId]);        

    if (!student) {
        return <div>Loading...</div>;  // Show a loading message while fetching data
    }

    return (
        <Template>
            <div className="container mt-4">
                <h1 className="mb-4">{student.first_name} {student.last_name}</h1>
                <p><strong>ID:</strong> {student.student_id}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Cohort(s):</strong> {student.cohort.replace(/\/$/, '').split('/').pop()}</p>
                <hr />

                <h3>Modules</h3>
                {modules.length > 0 ? (
                    <ul>
                        {modules.map(module => (
                            <li key={module.code}>
                                <Link to={`/modules/${module.code}`}>{module.full_name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No modules assigned.</p>
                )}

                <hr />

                <h3>Grades</h3>
                {grades.length > 0 ? (
                    <ul>
                        {grades.map(grade => (
                            <li key={grade.id}>
                                {grade.module.replace(/\/$/, '').split('/').pop()}: {grade.total_grade}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No grades available for this student.</p>
                )}
            </div>
        </Template>
    );
}

export default SingleStudent;