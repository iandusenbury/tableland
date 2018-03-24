import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableRowColumn, Avatar, FlatButton, RaisedButton } from 'material-ui'

// Returns an Avatar component with either a photo or icon
const getAvatar = url => {
  const avatar =
    typeof url === 'string' ? (
      <Avatar size={60} src={url} />
    ) : (
      <Avatar size={60} icon={url} />
    )

  return avatar
}

const tableRow = profile => {
  const { id, type, profileName, avatar, info, contact } = profile
  return (
    <TableRow className="search-table-row-stripe" key={`${type}_${id}`}>
      <TableRowColumn className="search-table-cell">
        <div className="search-table-name search-table-border">
          {profileName}
        </div>
        <div className="search-table-icon search-table-border">
          <div className="search-table-avatar">{avatar}</div>
          {type === 'User' &&
            <FlatButton
              className="search-table-flatbutton"
              hoverColor="#e7e0d7"
              containerElement={<Link to={`/roadmap/${id}`} />}
            >
              View profile
              </FlatButton>
          }
          {type === 'Organization' &&
            <FlatButton
              className="search-table-flatbutton"
              hoverColor="#e7e0d7"
              containerElement={<Link to={`/organization/${id}`} />}
            >
              View profile
              </FlatButton>
          }
          {type === 'Program' &&
            <FlatButton
              className="search-table-flatbutton"
              hoverColor="#e7e0d7"
              containerElement={<Link to={`/program/${id}`} />}
            >
              View profile
              </FlatButton>
          }
        </div>
        <div className="search-table-about">{info}</div>
        <div className="search-table-contact">{contact}</div>
      </TableRowColumn>
    </TableRow>
  )
}

export const renderProgram = program => {
  const { id, type, name, parentOrganizationNames, imageUrl, url: contactUrl } = program

  const avatar = getAvatar(imageUrl)
  const profileName = <h2>{name}</h2>
  const info = (
    <p>Hosted at: {parentOrganizationNames[0] && parentOrganizationNames[0][0]}</p>
  )
  //const contact = <a href={contactUrl}>{contactUrl}</a>
  const contact = <RaisedButton linkButton={true} href={contactUrl} label='View Website' />
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}

export const renderOrganization = organization => {
  const {
    id,
    type,
    name,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state,
    imageUrl,
    url: contactUrl
  } = organization

  const address = []

  if (addressLine1) {
    address.push(addressLine1)
  }
  if (addressLine2) {
    address.push(addressLine2)
  }
  if (addressLine3) {
    address.push(addressLine3)
  }
  const extendedAddress = []
  if (city) {
    extendedAddress.push(city, ', ')
  }
  if (state) {
    extendedAddress.push(state)
  }
  if (extendedAddress.length > 0) {
    address.push(extendedAddress)
  }

  const avatar = getAvatar(imageUrl)
  const profileName = <h2>{name}</h2>
  const info = (
    <div className='search-table-address'>{address.map((line, index) => <p key={index}>{line}</p>)}</div> // eslint-disable-line
  )
  //const contact = <a href={contactUrl}>{contactUrl}</a>
  const contact = <RaisedButton linkButton={true} href={contactUrl} label='View Website' />
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}

export const renderUser = user => {
  const {
    id,
    type,
    firstName,
    lastName,
    mainTitle,
    mainLocation,
    imageUrl,
    contactUrl
  } = user

  const avatar = getAvatar(imageUrl)
  const profileName = (
    <h2>
      {firstName} {lastName}
    </h2>
  )
  const info = (
      <p>{mainTitle} working at {mainLocation}</p>
  )
  //const contact = <p><a href={contactUrl}>{contactUrl}</a></p>
  const contact = <RaisedButton linkButton={true} href={contactUrl} label='View on LinkedIn' />
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}
