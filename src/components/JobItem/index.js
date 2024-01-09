import {IoMdStar} from 'react-icons/io'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'

const status = {inprogress: 'LOADING', success: 'SUCCESS', fail: 'FAILURE'}
const JobItem = props => {
  const {jobsList, apiStatus, similarClass, jobCardClass, altValue} = props
  const renderLoader = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderNotFoundJobs = () => (
    <div className="not-found-jobs-div">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="not-found-heading">No Jobs Found</h1>
      <p className="not-found-desc">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )
  const renderJobs = () => {
    const altValueOf = altValue ? 'similar job company logo' : 'company logo'
    if (jobsList.length === 0) {
      return renderNotFoundJobs()
    }
    return (
      <ul className={`openings-container ${similarClass}`}>
        {jobsList.map(eachJob => (
          <Link
            key={eachJob.id}
            className={`links ${jobCardClass}`}
            to={`/jobs/${eachJob.id}`}
          >
            <div className={`job-card `}>
              <div className="company-profile">
                <img
                  className="company-img"
                  src={eachJob.companyLogoUrl}
                  alt={altValueOf}
                />
                <div className="profile-content">
                  <h1 className="role-name">{eachJob.title}</h1>
                  <p className="stars">
                    <IoMdStar className="star-icon" />
                    {eachJob.rating}
                  </p>
                </div>
              </div>

              <div className="details-container">
                <div className="loac-type-div">
                  <div className="location-type-div">
                    <MdLocationOn className="icons" />
                    <p className="location">{eachJob.location}</p>
                  </div>
                  <div className="job-type-div">
                    <BsFillBriefcaseFill className="brief-icon" />
                    <p className="job-type">{eachJob.employmentType}</p>
                  </div>
                </div>
                <p className="package">{eachJob.packagePerAnnum}</p>
              </div>
              <hr className="hr-line" />
              <h1 className="desc-heading">Description</h1>
              <p className="job-description">{eachJob.jobDescription}</p>
            </div>
          </Link>
        ))}
      </ul>
    )
  }

  const renderdiffrentStatus = () => {
    if (status.inprogress === apiStatus) {
      return renderLoader()
    } else if (status.success === apiStatus) {
      return renderJobs()
    } else if (status.fail === apiStatus) {
      return (
        <div className="failure-div">
          <img
            className="failure-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1 className="not-found-heading">Oops! Something Went Wrong</h1>
          <p className="not-found-desc">
            We cannot seem to find the page you are looking for
          </p>
          <div className="retry-div">
            <button type="button" className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      )
    }
  }

  return renderdiffrentStatus()
}

export default JobItem
