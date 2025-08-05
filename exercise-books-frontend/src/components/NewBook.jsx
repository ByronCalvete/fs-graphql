import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ setError }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ published, setPublished ] = useState('')
  const [ genre, setGenre ] = useState('')
  const [ genres, setGenres ] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenre('')
    setGenres([])
  }

  const addGenre = () => {
    setGenres([ ...genres, genre ])
    setGenre('')
  }

  return (
    <>
      <h2>add new book</h2>
      <form onSubmit={onSubmit}>
        <div>
          title <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published <input type='number' value={published} onChange={({ target }) => setPublished(Number(target.value))} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button type='button' onClick={addGenre}>add genre</button>
        </div>
        {genres.length ? <div>genres: {genres.join(', ')}</div> : null}
        <button type='submit'>create book</button>
      </form>
    </>
  )
}

export default NewBook
