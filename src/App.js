import { BookList } from './components/BookList'
import { Login } from './components/Login'
import './App.css'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import { Routes, Route } from 'react-router-dom'
import { BookDetail } from './components/BookDetail'
import { BookForm } from './components/BookForm'
import Register from './components/Register'
import NavBar from './components/NavBar'
import AboutDemo from './components/About'

const App = () => {
  const [token, setToken] = useLocalStorageState('libraryToken', null)
  // const [token, setToken] = useState(null)
  const [username, setUsername] = useLocalStorageState('libraryUsername', '')
  // const [username, setUsername] = useState('')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const handleLogout = () => {
    // send request to log out on the server
    axios
      .post(
        'https://drf-library-api.herokuapp.com/api/auth/token/logout',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() =>
        // log out in React
        setAuth('', null)
      )
  }

  const isLoggedIn = username && token

  return (
    <>
      <header className="header is-flex is-justify-content-space-between has-background-info-dark has-text-white">
        🔖 BookList
        {isLoggedIn && <NavBar handleLogout={handleLogout} />}
      </header>
      <main className="container main">
        {isLoggedIn && (
          <div className="logged-in-message mt-2">
            <span className="tag is-info is-light">
              Hello, you're logged in as {username}
            </span>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="login"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="register"
            element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />}
          />
          <Route path="about" element={<AboutDemo />} />
          <Route
            path="books"
            element={<BookList token={token} isLoggedIn={isLoggedIn} />}
          />
          <Route path="books/:bookId" element={<BookDetail token={token} />} />
          <Route path="books/new" element={<BookForm token={token} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
