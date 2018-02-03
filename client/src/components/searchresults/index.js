import React from 'react'
import DisplayTable from './displaytable'
import {
  FlatButton,
} from 'material-ui'

/* dummies */
import { dummyList } from './dummies'

import './style.css'

const dummySearchKey = '"searchkey"';

const searchResults = props => {
  return (
    <div>
      <div className='search-header'>
        <h1 className='search-title'>Search Results</h1>
        <p>Results for { dummySearchKey }</p>
      </div>
      <div className='search-box'>
        <div className='search-box-list'>
          <DisplayTable users={dummyList} />
        </div>
        <div className='back-to-top'>
          <FlatButton hoverColor={'#bed62f'}
            href='#top'
            fullWidth
          >
            Return to top of results
          </FlatButton>
        </div>
      </div>
    </div>
  )
}

export default searchResults
