import { useQuery } from '@apollo/client'

import { ALL_PERSONS } from './queries'

import Persons from './compoenents/Persons'
import PersonForm from './compoenents/PersonForm'

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App
