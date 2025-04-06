import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Template from '../components/Template';

function SingleCohort() {
  const { cohortId } = useParams();
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${cohortId}/`)
      .then(response => response.json())
      .then(data => setCohort(data))
      .catch(error => console.error('Error fetching cohort details:', error));

    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortId}`)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, [cohortId]);

  if (!cohort) return <p>Loading cohort details...</p>;

  return (
    <Template>
      <div className="container mt-4">
        <h1 className="mb-3">{cohort.name} Cohort</h1>
        <p><strong>Degree:</strong> {cohort.degree.split('/').filter(Boolean).pop()}</p>
        <p><strong>Year:</strong> {cohort.year}</p>

        <hr />

        <h2>Students in {cohort.name}</h2>
        {students.length === 0 ? (
          <p>No students found in this cohort.</p>
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
                <tr key={student.id}>
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

        <hr />

        <Link to={`/modules/cohort/${cohortId}`} className="btn btn-outline-primary">
            View Modules Delivered to this Cohort
        </Link>

      </div>
    </Template>
  );
}

export default SingleCohort;