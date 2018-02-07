import React from 'react'
import { connect } from 'react-redux'
import { FlatButton } from 'material-ui'
import DisplayTable from './displaytable'

/* dummies */
import dummyList from './dummies'

import './style.css'

const dummySearchKey = '"searchkey"'

const searchResults = () => (
  <div>
    <div className="search-header">
      <h1 className="search-title">Search Results</h1>
      <p>Results for {dummySearchKey}</p>
    </div>
    <div className="search-box">
      <div className="search-box-list">
        <DisplayTable users={dummyList} />
      </div>
      <div className="back-to-top">
        <FlatButton hoverColor="#bed62f" href="#top" fullWidth>
          Return to top of results
        </FlatButton>
      </div>
    </div>
  </div>
)

export default connect()(searchResults)
