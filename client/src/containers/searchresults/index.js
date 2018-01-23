import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PageHeader, Table } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
//require('./style.css')

const dummyList = Array.from(Array(100).keys());

class searchresults extends Component {
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
          <td>{user}</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      )
    });
  }

  render() {
    return (
      <div style={{padding: '0 10% 0 10%'}}>
    {/*<h1 name='top'>Search Results</h1>*/}
        <PageHeader style={{paddingLeft: '5%'}}>Search Results</PageHeader>
        <div style={{overflow: 'scroll', height: 640}}>
          <Table responsive striped boredered condensed hover> {/* Div for list of results */}
            <thead>
              <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Desc</th>
              </tr>
            </thead>
            { this.displayUsers() }
          </Table>
        </div>
        <div>
          <a href='#top'>{'Back to top of results'}</a>
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
