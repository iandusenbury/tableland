import React, { Component } from 'react'
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
  Avatar
} from 'material-ui'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import TopTab from '../../constants/tabs/tabViewMap'
import './style.css'
import { orgPage } from '../../constants/viewStyles'
import {fetchOrgData} from "../../actions";
/*
  Employees should be listed as
  [icon/photo]  [name]  [position]
*/

const hasVideo = true // this will be passed as props
const portraitImg = require('./portrait.png')
const sampleImg = require('./sample.jpg')


class Organization extends Component{

    componentWillMount = () => {
        fetchOrgData();
    }

    renderTableRows = (employees) => {
       return employees.map((employee) => {
           var avatar = employee.avatar;
           if(!avatar){
               avatar = portraitImg;
           }
           return(
               <TableRow key={employee.id} className="tableRow" hoverable>
                   <TableRowColumn style={orgPage.tableRowColAvatar}>
                       <Avatar size={32} src={avatar} />
                   </TableRowColumn>
                   <TableRowColumn>{employee.first} {employee.last}</TableRowColumn>
                   <TableRowColumn>{employee.title}</TableRowColumn>
               </TableRow>
           )
       });

   }



  render(){

    const {
      organization: {
          name,
          description,
          url,
          address,
          city,
          state,
          country,
          postalCode,
          media,
          employees
      }
    } = this.props;

  return(
    <div className="mainDiv">
      <TopTab className="tab" />
      <div className="image">
        <Card>
          <CardMedia
            overlay={<CardTitle id="org_name" title={name} />}>
            <img src={sampleImg} alt="" />
          </CardMedia>
        </Card>
      </div>
      <div className="text">
        <div className="name">
          <h3>{name}</h3>
          <Divider />
        </div>
        <div className="contact">
          <div className="address">
            <BusinessIcon style={orgPage.businessIcon} />
            <div>
              <p>{address}</p>
              <p>{city}, {state} {postalCode} {country}</p>
            </div>
          </div>
          <div className="url">
            <div>
              <LanguageIcon style={orgPage.urlIcon} />
            </div>
            <div>
              <p>{url}</p>
            </div>
          </div>
        </div>
        <div className="description">
          <Divider />
          <p>{description}</p>
          {hasVideo && (
            <div>
              {
                // eslint-disable-next-line
              }
              <iframe width="420" height="315"
                        src={media}>
            </iframe>
            </div>
          )}
          <Divider />
        </div>
        <div className="employees">
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={orgPage.tableHeaderCol} />
                <TableHeaderColumn>Employee</TableHeaderColumn>
                <TableHeaderColumn>Job Title</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
                {this.renderTableRows(employees)}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
  }


}

export default Organization;
