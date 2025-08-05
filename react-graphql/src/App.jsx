import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_PERSONS } from './queries'

import Persons from './compoenents/Persons'
import PersonForm from './compoenents/PersonForm'
import Notification from './compoenents/Notification'
import PhoneForm from './compoenents/PhoneForm'

const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
