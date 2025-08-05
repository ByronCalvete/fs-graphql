import { useState } from 'react'

const NewBook = () => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ published, setPublished ] = useState('')
  const [ genre, setGenre ] = useState('')
  const [ genres, setGenres ] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('add book...')
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
          published <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
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
