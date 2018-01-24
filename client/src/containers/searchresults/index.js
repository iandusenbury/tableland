import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

/* dummies */
import { dummyList } from './dummies.js'

require('./style.css')

const dummySearchKey = '\"searchkey\"';

class searchresults extends Component {
  testConsole(user) {
    console.log('Loading page for', user.linkedin_id);
  }

  displayUsers() {
    return (
      <tbody>
        { this.displayUser() }
      </tbody>
    )
  }

  displayUser() {
    return this.props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>
            <div className='table-name'>
              <h4>{ user.first_name } { user.last_name }</h4>
            </div>
            <div className='table-icon'>
              <img src={require('./portrait.png')} alt='portrait' height='72' width='72'/>
              {/* Loads a user's roadmap.
                <p onClick={() => changePage(user)}>View profile</p>
              */}
              <p onClick={() => this.testConsole(user)}>View profile</p>
            </div>
            <div className='table-about'>
              <p>Works at: { user.org_name }</p>
            </div>
            <ul className='table-contact'>
              <li>LinkedIn: { user.linkedin_id }</li>
              <li>Contact: { user.contact_url }</li>
            </ul>
          </td>
        </tr>
      )
    });
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
            <Table responsive condensed hover>
              { this.displayUsers() }
            </Table>
          </div>
          <div className='back-to-top'>
            <a href='#top'>{'Back to top of results'}</a>
          </div>
        </div>
      </div>
    )
  }
}

const matchStateToProps = state => {
  return {
    users: dummyList,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
//  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(searchresults)
