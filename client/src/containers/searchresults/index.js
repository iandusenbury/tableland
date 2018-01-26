import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayTable from './displaytable'
import Button from 'react-toolbox/lib/button/Button'

/* dummies */
import { dummyList } from './dummies'

import './style.css'

const dummySearchKey = '"searchkey"';

class searchresults extends Component {
  constructor(props) {
    super()
    this.state = {
      users: props.users,
    }
  }

  render() {
    return (
      <div>
        <div className='search-header'>
          <h1 className='search-title'>Search Results</h1>
          <p>Results for { dummySearchKey }</p>
        </div>
        <div className='search-box'>
          <div className='search-box-list'>
            <DisplayTable users={this.state.users} />
          </div>
          <div className='back-to-top'>
            <Button href='#top' flat>{'Return to top of results'}</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: dummyList,
  };
}

export default connect(
  mapStateToProps,
)(searchresults)
