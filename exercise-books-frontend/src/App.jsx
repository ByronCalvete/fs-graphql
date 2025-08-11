import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recomendations from './components/Recomendations'

const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ token, setToken ] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const padding = {
    padding: 10
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  if (!token) {
    return (
      <>
        <Notification errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </>
    )
  }

  return (
    <>
      <Notification errorMessage={errorMessage}/>
      <div>
        <nav>
          <Link style={padding} to='/'>Authors</Link>
          <Link style={padding} to='/books'>Books</Link>
          <Link style={padding} to='/new-book'>Add Book</Link>
          <Link style={padding} to='/recommend'>Recommended</Link>
          <button onClick={logout}>logout</button>
        </nav>
        <Routes>
          <Route path='/' element={<Authors setError={notify} />} />
          <Route path='/books' element={<Books />} />
          <Route path='/new-book' element={<NewBook setError={notify} />} />
          <Route path='/recommend' element={<Recomendations />}/>
        </Routes>
      </div>
    </>
  ) 
}

export default App
