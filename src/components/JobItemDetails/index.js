import './index.css'
import Cookies from 'js-cookie'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {Component} from 'react'
import Header from '../Header'
import JobItem from '../JobItem'

const status = {
  inprogress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {
    jobDetails: '',
    similarJobs: [],
    apiStatus: status.inprogress,
  }

  componentDidMount = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedJobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: data.job_details.life_at_company,
        skills: data.job_details.skills,
      }
      const formattedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: formattedJobData,
        similarJobs: formattedSimilarJobs,
        apiStatus: status.success,
      })
    }
  }

  renderLoader = () => (
    <div className="jobs-loader-container detailed-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDetailsPage = () => {
    const {similarJobs, jobDetails, apiStatus} = this.state
    console.log(jobDetails)
    return (
      <div className="job-details-container">
        <div className="job-card detailed-card">
          <div className="company-profile">
            <img
              className="company-img"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="profile-content">
              <h1 className="role-name">{jobDetails.title}</h1>
              <p className="stars">
                <IoMdStar className="star-icon" />
                {jobDetails.rating}
              </p>
            </div>
          </div>

          <div className="details-container">
            <div className="loac-type-div">
              <div className="location-type-div">
                <MdLocationOn className="icons" />
                <p className="location">{jobDetails.location}</p>
              </div>
              <div className="job-type-div">
                <BsFillBriefcaseFill className="brief-icon" />
                <p className="job-type">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="description-link-div">
            <h1 className="desc-heading headings">Description</h1>
            <a
              className="anchor-tag"
              target="_blank"
              href={jobDetails.companyWebsiteUrl}
              rel="noreferrer"
            >
              Visit <HiOutlineExternalLink />
            </a>
          </div>
          <p className="job-description life-description ">
            {jobDetails.jobDescription}
          </p>
          <h1 className="desc-heading headings">Skills</h1>
          <ul className="skills-container">
            {jobDetails.skills.map(skill => (
              <li key={skill.name} className="skill-card">
                <img
                  className="skill-img"
                  alt={skill.name}
                  src={skill.image_url}
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-card">
            <div className="content">
              <p className="desc-heading headings">Life at Company</p>
              <p className="job-description life-description">
                {jobDetails.lifeAtCompany.description}
              </p>
            </div>
            <img
              className="life-at-img"
              src={jobDetails.lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="desc-heading headings">Similar Jobs</h1>
          <JobItem
            jobsList={similarJobs}
            apiStatus={apiStatus}
            similarClass="similar-lg-class"
            jobCardClass="lg-job-cards"
            altValue
          />
        </div>
      </div>
    )
  }

  renderDiffStates = () => {
    const {apiStatus} = this.state
    if (apiStatus === status.inprogress) {
      return this.renderLoader()
    }
    if (apiStatus === status.success) {
      return this.renderDetailsPage()
    }
  }

  render() {
    console.log()

    return (
      <div className="job-details-page">
        <Header />
        {this.renderDiffStates()}
      </div>
    )
  }
}

export default JobItemDetails
