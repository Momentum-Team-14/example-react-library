import axios from 'axios'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Register = ({ setAuth, isLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
    axios
      .post('https://drf-library-api.herokuapp.com/api/auth/users/', {
        username: username,
        password: password,
      })
      .then((res) => {
        setAuth(username, res.data.auth_token)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="books" />
  }

  return (
    <div className="container m-5">
      <h2 className="is-size-4">sign up for a new account</h2>
      {error && <div className="error">{error}</div>}
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-controls field">
          <label htmlFor="username-field" className="label">
            username
          </label>
          <div className="control">
            <input
              id="username-field"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="input"
            />
          </div>
        </div>
        <div className="form-controls field">
          <label htmlFor="password-field" className="label">
            password
          </label>
          <div className="control">
            <input
              id="password-field"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input"
            />
          </div>
        </div>
        <div className="form-submit">
          <input
            className="button is-outlined is-primary"
            type="submit"
            value="Register"
          />
        </div>
      </form>
      <div className="link">
        <Link to="../" className="button mt-5">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default Register
