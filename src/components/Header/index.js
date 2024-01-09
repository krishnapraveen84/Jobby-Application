import './index.css'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const onLogutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navBar">
      <Link to="/" className="logo-img links">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="nav-items-sm">
        <li key="l1">
          <Link to="/" className="link">
            {/* eslint-disable-next-line */}
            <button type="button" className="icons">
              <IoMdHome className="icon home-icon" />
            </button>
          </Link>
        </li>
        <li key="l2">
          <Link to="/jobs" className="link">
            {/* eslint-disable-next-line */}
            <button type="button" className="icons">
              <BsFillBriefcaseFill className="icon" />
            </button>
          </Link>
        </li>
        <li key="l3">
          {/* eslint-disable-next-line */}
          <button type="button" className="icons">
            <FiLogOut className="icon" />
          </button>
        </li>
      </ul>

      <ul className="routes-links">
        <li className="routes-item">
          <Link className="link" to="/">
            <p className="routes">Home</p>
          </Link>
        </li>
        <li className="routes-item">
          <Link className="link" to="/jobs">
            <p className="routes">Jobs</p>
          </Link>
        </li>
        <li className="logout-item">
          <button type="button" onClick={onLogutUser} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
