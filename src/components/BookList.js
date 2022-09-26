import axios from 'axios'
import { useState, useEffect } from 'react'
import { BookCard } from './BookCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Navigate } from 'react-router-dom'

export const BookList = ({ token, isLoggedIn }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://drf-library-api.herokuapp.com/api/books', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setBooks(res.data)
        setIsLoading(false)
      })
  }, [token])

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  if (isLoading) {
    return (
      <Skeleton
        count={10}
        height="75px"
        width="90%"
        containerClassName="skeleton-container"
      />
    )
  }

  return (
    <>
      <div className="book-list container-box">
        {books.map((book) => (
          <BookCard
            key={book.pk}
            title={book.title}
            bookId={book.pk}
            featured={book.featured}
          />
        ))}
      </div>
    </>
  )
}
