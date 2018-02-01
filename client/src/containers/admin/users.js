import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Input,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  FlatButton,
  RaisedButton,
  AutoComplete,
} from 'material-ui'

import './style.css'

const Users = (props) => {
  let button1
  let button2

  if(props.button1) {
    button1 = (
      <TableRowColumn>
        <RaisedButton
          backgroundColor='#bed62f'
          label={props.button1}
        />
      </TableRowColumn>
    )
  }
  if(props.button2) {
    button2 = (
      <TableRowColumn>
        <FlatButton
          style={{color: 'red'}}
          label={props.button2}
        />
      </TableRowColumn>
    )
  }

  return (
    <div className='table-list'>
      <h2>{props.title}</h2>
      <div className='search-filter'>
        <AutoComplete
          hintText='Search'
          dataSource={
            props.users.map((user) =>
            {
              return(user.linkedin_id)
            })
          }
          fullWidth
          maxSearchResults={4}
          filter={AutoComplete.fuzzyFilter}
          onNewRequest={{/*Insert Action here*/}}
        />
      </div>
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Created On</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            props.users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.first_name} {user.last_name}</TableRowColumn>
                  <TableRowColumn>{user.linkedin_id}</TableRowColumn>
                  <TableRowColumn>Jun 15, 1988</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      backgroundColor='#8195b1'
                      label='View'
                    />
                  </TableRowColumn>
                  {button1}
                  {button2}
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default connect(

)(Users)
