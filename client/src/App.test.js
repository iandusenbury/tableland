import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'

/* eslint-disable no-undef */
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
