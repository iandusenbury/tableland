import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  Avatar,
  FlatButton
} from 'material-ui'

const renderUser = user => {
  const {
    id,
    firstName,
    lastName,
    mainTitle,
    mainLocation,
    // linkedinId,
    media,
    contactUrl
  } = user
  const findAvatar = media.find(element => {
    return element.category === 'image'
  })
  // console.log(findAvatar)
  // const displayAvatar = require('./portrait.png')
  return (
    <TableRow className="table-row-stripe" key={id}>
      <TableRowColumn className="table-cell">
        <div className="table-name table-border">
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
        <div className="table-icon table-border">
          <div className="table-avatar">
            <Avatar size={60} /*src={displayAvatar}*/ />
          </div>
          <FlatButton className="table-flatbutton" hoverColor="#e7e0d7">
            View profile
          </FlatButton>
        </div>
        <div className="table-about">
          <ul>
            <li>{mainTitle}</li>
            <li>Working at: {mainLocation}</li>
          </ul>
        </div>
        <ul className="table-contact">
          {/* <li>LinkedIn: {linkedinId}</li> */}
          <li>Contact: {contactUrl}</li>
        </ul>
      </TableRowColumn>
    </TableRow>
  )
}

// TODO: remove this rule once the require statment has been removed
/* eslint-disable global-require */
class DisplayTable extends Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
    // this.renderUser = this.renderUser.bind(this)
    // this.renderProgram = this.renderProgram.bind(this)
    // this.renderOrganization = this.renderOrganization.bind(this)
  }

  renderTableRows() {
    const { results } = this.props

    const tableRows = results.map(result => {
      // const {
      //   id,
      //   firstName,
      //   lastName,
      //   title,
      //   orgName,
      //   linkedinId,
      //   contactUrl
      // } = result
      let renderRow
      const { type } = result
      switch (type) {
        case 'User':
          renderRow = this.renderUser
          break
        // case 'Program':
        //   renderRow = this.renderProgram
        //   break
        // case 'Organization':
        //   renderRow = this.renderOrganization
        //   break
        default:
          break
      }
      return renderUser(result)
    })

    return tableRows
  }

  render() {
    return (
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderTableRows()}
        </TableBody>
      </Table>
    )
  }
}

DisplayTable.propTypes = {
  results: PropTypes.element.isRequired
}

export default DisplayTable
