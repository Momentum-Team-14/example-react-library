import { Link } from 'react-router-dom'

export const BookCard = ({ title, bookId, featured, setSelected }) => {
  return (
    <div className="book card" id={bookId}>
      <div className="card-content">
        <div className="content">
          <p>
            <Link to={`./${bookId}`} relative="path">
              {title}
            </Link>
            {featured && (
              <>
                <span className="icon">
                  <i className="fa-solid fa-feather-pointed has-text-info"></i>
                </span>
                <span className="is-italic is-size-7 has-text-info">
                  featured
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
