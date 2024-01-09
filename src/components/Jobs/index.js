import './index.css'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import JobItem from '../JobItem'

import Header from '../Header'

const status = {
  inprogress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    userProfile: '',
    currentStatus: status.inprogress,
    minimumPackage: '',
    employmentType: [],
    searchInput: '',
    jobsList: [],
    apiStatus: status.inprogress,
  }

  componentDidMount = async () => {
    this.getJobsList()
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch('https://apis.ccbp.in/profile', options)
      const data = await response.json()
      const userDetails = data.profile_details
      if (response.ok) {
        const formatedData = {
          name: userDetails.name,
          profileImageUrl: userDetails.profile_image_url,
          shortBio: userDetails.short_bio,
        }
        this.setState({
          userProfile: formatedData,
          currentStatus: status.success,
        })
      }
    } catch (err) {
      this.setState({currentStatus: status.fail})
    }
  }

  getJobsList = async () => {
    const {minimumPackage, employmentType, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const employmentTypeStr = employmentType.join(',')
    console.log(employmentTypeStr)
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeStr}&minimum_package=${minimumPackage}&search=${searchInput}`
    try {
      const response = await fetch(apiurl, options)
      const data = await response.json()
      const formatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (response.ok) {
        this.setState({jobsList: formatedData, apiStatus: status.success})
      }
    } catch (err) {
      this.setState({apiStatus: status.fail})
    }
  }

  renderLoader = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderUserProfile = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile
    return (
      <div className="user-profile-card">
        <img className="sm-profile" src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderDiffStatus = () => {
    const {currentStatus} = this.state
    if (status.inprogress === currentStatus) {
      return this.renderLoader()
    }
    if (status.success === currentStatus) {
      return this.renderUserProfile()
    }
    if (status.fail === currentStatus) {
      return (
        <div className="retry-div">
          <button type="button" className="retry-btn">
            Retry
          </button>
        </div>
      )
    }
  }

  onSearchInputSubmit = () => {
    this.getJobsList()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckSalaryInput = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobsList)
    console.log(event.target.value)
  }

  onTypeChange = event => {
    const {employmentType} = this.state
    const typeOf = event.target.value
    if (employmentType.includes(typeOf)) {
      const filterEmpolyType = employmentType.filter(each => each !== typeOf)
      this.setState({employmentType: filterEmpolyType}, this.getJobsList)
    } else {
      this.setState(
        prev => ({employmentType: [...prev.employmentType, typeOf]}),
        this.getJobsList,
      )
    }
  }

  render() {
    const {apiStatus, jobsList} = this.state

    return (
      <div className="jobs-bg-container">
        <Header />

        <div className="all-jobs-filter-container">
          <div className="job-filter-sections">
            <div className="jobs-container">
              <div className="search-bar">
                <input
                  onChange={this.onSearchInput}
                  className="input"
                  placeholder="Search"
                  type="search"
                />
                {/* eslint-disable-next-line */}
                <button
                  type="button"
                  onClick={this.onSearchInputSubmit}
                  className="search-icon"
                  data-testid="searchButton"
                >
                  <IoIosSearch />
                </button>
              </div>
              {this.renderDiffStatus()}
            </div>
            <hr className="h-line" />
            <h1 className="sub-headings">Type of Employment</h1>
            <ul className="empolyment-type-div">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId} className="check-box">
                  <input
                    onChange={this.onTypeChange}
                    value={each.employmentTypeId}
                    id={each.employmentTypeId}
                    type="checkbox"
                    className="check-input"
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="check-label"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="h-line hl2" />
            <h1 className="sub-headings">Salary Range</h1>
            <ul className="empolyment-type-div salary-range">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} className="check-box">
                  <input
                    onChange={this.onCheckSalaryInput}
                    value={each.salaryRangeId}
                    id={each.salaryRangeId}
                    type="radio"
                    name="salary"
                    className="check-input"
                  />
                  <label htmlFor={each.salaryRangeId} className="check-label">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="search-job-items-div">
            <div className="search-bar-lg">
              <input
                onChange={this.onSearchInput}
                className="input"
                placeholder="Search"
                type="search"
              />
              {/* eslint-disable-next-line */}
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onSearchInputSubmit}
                className="search-icon"
              >
                <IoIosSearch />
              </button>
            </div>
            <JobItem apiStatus={apiStatus} jobsList={jobsList} />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
