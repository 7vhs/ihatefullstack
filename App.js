// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Degrees from './pages/Degrees'; import Home from './pages/Home';
import SingleDegree from './pages/SingleDegree';
import Cohorts from './pages/Cohorts';
import SingleCohort from './pages/SingleCohort';
import Modules from './pages/Modules';
import SingleModule from './pages/SingleModule';
import ModulesForCohort from './pages/ModulesForCohort';
import SingleStudent from './pages/SingleStudent';
import CreateStudent from './pages/CreateStudent';
import CreateCohort from './pages/CreateCohort';
import CreateDegree from './pages/CreateDegree';
import CreateModule from './pages/CreateModule';
import SetGrades from './pages/SetGrades';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/degrees" element={<Degrees/>} />
          <Route path="/degrees/:shortcode" element={<SingleDegree/>} />
          <Route path="/cohorts" element={<Cohorts/>} />
          <Route path="/cohorts/:cohortId" element={<SingleCohort />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleCode" element={<SingleModule />} />
          <Route path="/modules/cohort/:cohortCode" element={<ModulesForCohort />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-cohort" element={<CreateCohort />} />
          <Route path="/create-degree" element={<CreateDegree />} />
          <Route path="/create-module" element={<CreateModule />} />
          <Route path="/set-grades" element={<SetGrades />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;