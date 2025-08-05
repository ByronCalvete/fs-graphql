import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = ({ setError }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [ setBirthYear, resultMutation ] = useMutation(SET_BIRTHYEAR)

  useEffect(() => {
    if (resultMutation.data && resultMutation.data.editAuthor === null) {
      setError('author not found')
    }
  }, [resultMutation.data])

  if (result.loading) {
    return <div>Fetching authors...</div>
  }

  const authors = result.data.allAuthors

  const updateAuthor = (e) => {
    e.preventDefault()
    setBirthYear({ variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(author =>
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <label>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=''>Select an author</option>
            {authors.map(author =>
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </label>
        <div>
          born <input type='number' value={born} onChange={({ target }) => setBorn(Number(target.value))} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default Authors
