import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import { ALL_PERSONS } from './queries'

import Persons from './compoenents/Persons'
import PersonForm from './compoenents/PersonForm'
import Notification from './compoenents/Notification'
import PhoneForm from './compoenents/PhoneForm'
import LoginForm from './compoenents/LoginForm'

const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ token, setToken ] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>Loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  if (!token) {
    return (
      <>
        <Notification errorMessage={errorMessage}/>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
