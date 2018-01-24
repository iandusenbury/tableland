import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PageHeader, Table } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
require('./style.css')

const dummyList = Array.from(Array(5).keys());

class searchresults extends Component {
  testConsole(num) {
    console.log('hello ', num);
  }
  displayUsers() {
    /* example below
    return this.props.users.map((user) => {
      return (
        <div key={user.id}>
          // Display a user's information here.
        </div>
      )
    });
    */
    return (
      <tbody>
        {
          this.displayUser()
        }
      </tbody>
    )
  }

  displayUser() {
    return dummyList.map((user) => {
      return (
        <tr key={user}>
          <td>
            <div className='table-name'>
              <h4>Mike Wazowski</h4>
            </div>
            <div className='table-icon'>
              <img src={require('./mike.jpg')} alt='portrait' height='72' width='72'/>
              <p onClick={() => this.testConsole(user)}>View profile</p>
            </div>
            <div className='table-about'>
              <p>Title</p>
              <p>Education</p>
              <p>Current Position</p>
            </div>
            <ul className='table-contact'>
              <li>mikew@monsters.inc</li>
              <li>scarebecausewecare.com/contact</li>
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
          <h1 className='search-title'>Search Results
          </h1>
        </div>
        {/*
        <div className='search-button-box'>
          <div className='search-button'>
            <Button bsStyle='primary search-button'>
              View Roadmap
            </Button>
          </div>
        </div>
        */}
        <div className='search-box'>
          <div className='search-box-list'>
            <Table responsive striped condensed hover>{/* Div for list of results */}
              {/*
              <thead>
                <tr className='tr-header'>
                  <th className='td-about'>About</th>
                  <th>Contact</th>
                </tr>
              </thead>
              */}
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
    /* example below
    users: state.app.users,
    currentUser: state.app.currentUser
    */
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
//  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(searchresults)
