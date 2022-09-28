import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export const BookForm = ({ token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pubDate, setPubDate] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(
        'https://drf-library-api.herokuapp.com/api/books',
        {
          title: title,
          author: author,
          publication_year: pubDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setSubmitted(true)
        setTitle('')
        setAuthor('')
        setPubDate('')
      })
      .catch((err) => setError(err.response.data.error))
  }

  if (submitted) {
    return <Navigate to="/books" />
  }
  const handleChange = (inputType, event) => {
    if (inputType === 'title') {
      setTitle(event.target.value)
    }
    if (inputType === 'author') {
      setAuthor(event.target.value)
    }
    if (inputType === 'publication date') {
      setPubDate(event.target.value)
    }
  }

  return (
    <div className="container m-5">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="is-size-4">Create a new book</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-controls field">
          <label htmlFor="username-field" className="label">
            title
          </label>
          <div className="control">
            <input
              id="title-field"
              onChange={(e) => handleChange('title', e)}
              type="text"
              placeholder="Book title"
              value={title}
              className="input"
              required
            />
          </div>
        </div>
        <div className="form-controls field">
          <label htmlFor="author-field" className="label">
            author
          </label>
          <div className="control">
            <input
              id="author-field"
              placeholder="Author"
              type="text"
              value={author}
              onChange={(e) => handleChange('author', e)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="form-controls field">
          <label htmlFor="publication-date-field" className="label">
            publication date
          </label>
          <div className="control">
            <input
              className="input"
              placeholder="Publication date"
              type="text"
              value={pubDate}
              required
              onChange={(e) => handleChange('publication date', e)}
            />
          </div>
        </div>
        <div className="form-submit mt-5">
          <input
            className="button is-outlined is-primary"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  )
}
