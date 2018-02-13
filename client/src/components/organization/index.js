import React from 'react'
import {
  Card,
  CardMedia,
  CardTitle,
  Divider,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui'
import TopTab from '../../constants/tabs/tabViewMap'
import BottomTab from '../../constants/tabs/tabViewProfile'
import './style.css'
/*
  Employees should be listed as
  [icon/photo]  [name]  [position]
*/

export default (props) => (
  <div className="mainDiv">
    <TopTab className="tab" />
    <div className="image">
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              id="org_name"
              title="Organization name here"
            />}
        >
          <img src={require('./sample.jpg')} alt="" />
        </CardMedia>
      </Card>
    </div>
    <div className="text">
      <div className="name">
        <p>
          Organization Name
        </p>
        <Divider />
      </div>
      <div className="address">
        <p>
          123 company rd
        </p>
      </div>
      <div className="url">
        <p>
          url
        </p>
        <Divider />
      </div>
      <div className="description">
        <p>
          Description
        </p>
        <Divider />
      </div>
      <div className="employees">
        <Table>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Employee</TableHeaderColumn>
              <TableHeaderColumn>Job Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            <TableRow>
              <TableRowColumn>
                [icon] Fred Henderson
              </TableRowColumn>
              <TableRowColumn>
                Engineer
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
)
