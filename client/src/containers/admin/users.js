import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Button from 'react-toolbox/lib/button/Button'
import AutoComplete from 'material-ui/AutoComplete'
require('./style.css')

const Users = (props) => {
  let button1
  let button2

  if(props.button1) {
    button1 = <TableCell><Button primary raised label={props.button1}></Button></TableCell>
  }
  if(props.button2) {
    button2 = <TableCell><Button raised label={props.button2}></Button></TableCell>
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
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Created On</TableCell>
        </TableHead>
        { props.users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.linkedin_id}</TableCell>
                <TableCell>Jun 15, 1988</TableCell>
                <TableCell><Button primary label="View"></Button></TableCell>
                {button1}
                {button2}
              </TableRow>
            )
          })
        }
      </Table>
    </div>
  )
}

export default connect(

)(Users)
