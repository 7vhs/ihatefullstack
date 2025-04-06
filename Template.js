import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Template({ children }) {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Dublin City University</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">Home</Link>
            <Link className="nav-item nav-link" to="/degrees">Degrees</Link>
            <Link className="nav-item nav-link" to="/cohorts">Cohorts</Link>
            <Link className="nav-item nav-link" to="/modules">Modules</Link>

            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/create-student">Create Student</Link></li>
                <li><Link className="dropdown-item" to="/create-cohort">Create Cohort</Link></li>
                <li><Link className="dropdown-item" to="/create-degree">Create Degree</Link></li>
                <li><Link className="dropdown-item" to="/create-module">Create Module</Link></li>
                <li><Link className="dropdown-item" to="/set-grades">Set Grades</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 pb-5">{children}</main>

      <hr />
      <footer className="bg-dark text-white text-center py-3 mt-4 fixed-bottom">
        <p className="mb-0">&copy; 2025 Dublin City  University</p>
      </footer>
    </div>
  );
}

export default Template;