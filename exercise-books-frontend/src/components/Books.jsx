import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [ filterGenre, setFilterGenre ] = useState(null)

  if (result.loading) {
    return <div>Fetching books...</div>
  }

  const books = result.data.allBooks
  const genres = [ ...new Set((books.map(book => book.genres)).flat()) ]

  const handleGenre = (genre) => {
    setFilterGenre(genre)
  }

  const filterBooks = !filterGenre ? books : books.filter(book => book.genres.includes(filterGenre))

  return (
    <>
      <h2>books</h2>
      {filterGenre && <div>in genre <strong>{filterGenre}</strong></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map(book => 
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ paddingTop: 10 }}>
        {genres.map(genre =>
          <button key={genre} onClick={() => handleGenre(genre)}>
            {genre}
          </button>
        )}
        <button onClick={() => setFilterGenre(null)}>all genres</button>
      </div>
    </>
  )
}

export default Books
