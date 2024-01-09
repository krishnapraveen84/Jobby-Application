import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="bg-container">
    <Header />
    <div className="home-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link">
        <button type="button" className="find-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
