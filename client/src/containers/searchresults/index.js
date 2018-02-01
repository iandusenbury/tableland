import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayTable from './displaytable'
import {
  FlatButton
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
          <FlatButton href='#top' flat>{'Return to top of results'}</FlatButton>
        </div>
      </div>
    </div>
  )
}

export default connect(
)(searchResults)
