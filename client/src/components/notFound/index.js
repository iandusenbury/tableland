import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import './styles.css'

const NotFound = () => (
  <div className="error-container">
    <h1 className="error-number">404</h1>
    <div className="error-message">Not Found</div>
  </div>
)

export default muiThemeable()(NotFound)
