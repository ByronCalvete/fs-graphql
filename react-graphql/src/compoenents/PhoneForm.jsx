import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

  const onSubmit = (e) => {
    e.preventDefault()
    changeNumber({ variables: { name, phone } })
    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data])

  return (
    <>
      <h2>Change number</h2>
      <form onSubmit={onSubmit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <button type='submit'>change number</button>
      </form>
    </>
  )
}

export default PhoneForm
