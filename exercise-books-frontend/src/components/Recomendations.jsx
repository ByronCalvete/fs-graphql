import { useQuery } from "@apollo/client"
import { USER_LOGGED, ALL_BOOKS } from "../queries"

const Recomendations = () => {
  const resultUser = useQuery(USER_LOGGED, {
    fetchPolicy: 'network-only'
  })
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultUser.loading || resultBooks.loading) {
    return <div>Loading data...</div>
  }

  const user = resultUser.data.me
  const books = resultBooks.data.allBooks

  const filterBooks = books.filter(book => book.genres.includes(user?.favoriteGenre))

  return (
    <>
      <h2>recomendations</h2>
      <div>books in your favorite genre <strong>{user?.favoriteGenre}</strong></div>
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
    </>
  )
}

export default Recomendations
