import { Routes, Route, Link } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const padding = {
    padding: 10
  }

  return (
    <>
      <nav>
        <Link style={padding} to='/'>Authors</Link>
        <Link style={padding} to='/books'>Books</Link>
        <Link style={padding} to='/new-book'>Add Book</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/new-book' element={<NewBook />} />
      </Routes>
    </>
  ) 
}

export default App
