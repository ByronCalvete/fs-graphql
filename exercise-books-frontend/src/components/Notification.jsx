const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red', padding: 10 }}>
      {errorMessage}
    </div>
  )
}

export default Notification
