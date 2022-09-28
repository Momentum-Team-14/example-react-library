import { Link } from 'react-router-dom'
const NavBar = ({ handleLogout }) => {
  return (
    <nav
      className="navbar level is-transparent has-background-info-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="level-right">
        <div className=" level-item">
          <Link to="books/new" className="has-text-white is-size-6 px-2">
            Add a Book
          </Link>
        </div>
        <div className=" level-item">
          <Link to="about" className="has-text-white is-size-6 px-2">
            About
          </Link>
        </div>
        <div className=" level-item">
          <Link to="/" className="has-text-white is-size-6 px-2">
            Home
          </Link>
        </div>
        <div className="level-item">
          <Link
            to="/"
            className="button is-primary is-light"
            onClick={handleLogout}
          >
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default NavBar
