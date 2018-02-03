import React from 'react'

const Home = props => {
  const { changePage, message } = props

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      <button onClick={() => changePage()}>Go to about page via redux</button>
    </div>
  )
}

export default Home
