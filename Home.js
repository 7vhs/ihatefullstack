import React from 'react';
import Template from '../components/Template';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Template>
      <div className="container mt-4">
        <h1>Welcome to the Dublin City University Portal</h1>
        <p>Explore a wide range of degrees, join cohorts, and stay connected with your academic journey.</p>

        <hr />

        <div className="row mt-4">
          <div className="col-md-4 text-center">
            <h5><Link className="text-primary" to="/degrees">Degrees</Link></h5>
            <p>Find the degree program that suits you best.</p>
          </div>
          <div className="col-md-4 text-center">
            <h5><Link className="text-primary" to="/cohorts">Cohorts</Link></h5>
            <p>Join a cohort and collaborate with fellow students.</p>
          </div>
          <div className="col-md-4 text-center">
            <h5><Link className="text-primary" to="/modules">Modules</Link></h5>
            <p>Discover and register for the modules you need.</p>
          </div>
        </div>

      </div>
    </Template>
  );
}

export default Home;