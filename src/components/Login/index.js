import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorMesg: ''}

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(response)
      console.log()
      this.setState({errorMesg: data.error_msg})
    }
  }

  render() {
    const {errorMesg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.onLogin} className="login-card">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="user-name-div">
            <label className="label" htmlFor="userName">
              USERNAME
            </label>
            <input
              onChange={this.onUserNameChange}
              id="userName"
              className="login-input"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="password-div user-name-div">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onPasswordChange}
              id="password"
              className="login-input"
              placeholder="Password"
              type="password"
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="error-mes">{errorMesg ? `* ${errorMesg}` : ''}</p>
        </form>
      </div>
    )
  }
}
export default Login
