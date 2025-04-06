import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Template from '../components/Template';

function SingleModule() {
  const { moduleCode } = useParams();
  const [module, setModule] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the module details
    fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`)
      .then(response => response.json())
      .then(data => {
        setModule(data);
        const cohortCodes = data.delivered_to;

        if (cohortCodes && cohortCodes.length > 0) {
          Promise.all(cohortCodes.map(cohortCode =>
            fetch(cohortCode)
              .then(response => response.json())
              .then(cohortData => {
                return fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortData.id}`)
                  .then(response => response.json());
              })
          ))
          .then(allStudentData => {
            console.log('All student data (before flattening):', allStudentData);
            const flatStudents = allStudentData.flat();
            setStudents(flatStudents);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching students for cohorts:', error);
            setLoading(false);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching module details:', error);
        setLoading(false);
      });
  }, [moduleCode]);

  if (loading) return <p>Loading module and students...</p>;

  if (!module) return <p>Module not found!</p>;

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">{module.full_name} ({module.code})</h1>
        
        <hr />

        <h2>Students Enrolled in {module.full_name}</h2>
        {students.length === 0 ? (
          <p>No students found for this module.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.student_id}>
                  <td>{student.first_name} {student.last_name}</td>
                  <td>{student.student_id}</td>
                  <td>
                    <Link to={`/students/${student.student_id}`} className="btn btn-outline-primary btn-sm">
                      View Student
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

export default SingleModule;