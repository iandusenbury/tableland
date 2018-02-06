import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DisplayDummyTable from './displaydummytable'
import {
  FlatButton,
} from 'material-ui'

import { fetchDummyUsersExample } from '../../actions'

import './style.css'

const dummySearchKey = '"searchkey"';

class DummyUsers extends Component {
  componentWillMount() {
    const { fetchDummyUsersExample } = this.props

    fetchDummyUsersExample()
  }

  render() {
    const {
      users,
    } = this.props
    return (
      <div>
        <div className='search-header'>
          <h1 className='search-title'>Search Results</h1>
          <p>Results for { dummySearchKey }</p>
        </div>
        <div className='search-box'>
          <div className='search-box-list'>
            <DisplayDummyTable users={users} />
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
}

const mapStateToProps = state => {
  return {
    users: state.app.dummyUsers.users
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDummyUsersExample,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DummyUsers)
