import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const padding = {
    padding: 10
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <>
      <Notification errorMessage={errorMessage}/>
      <div>
        <nav>
          <Link style={padding} to='/'>Authors</Link>
          <Link style={padding} to='/books'>Books</Link>
          <Link style={padding} to='/new-book'>Add Book</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Authors setError={notify} />} />
          <Route path='/books' element={<Books />} />
          <Route path='/new-book' element={<NewBook setError={notify} />} />
        </Routes>
      </div>
    </>
  ) 
}

export default App
