import React from 'react'
import { TableRow, TableRowColumn, Avatar, FlatButton } from 'material-ui'

const defaultImage = require('./portrait.png')

const retrieveMedia = media => {
  const foo = media.reduce((obj, item) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    obj[item.category] = item
    return obj
  }, {})
  return foo.image ? foo.image.url : defaultImage
}

const tableRow = profile => {
  const { id, profileName, avatar, info, contact } = profile
  return (
    <TableRow className="search-table-row-stripe" key={id}>
      <TableRowColumn className="search-table-cell">
        <div className="search-table-name search-table-border">
          {profileName}
        </div>
        <div className="search-table-icon search-table-border">
          <div className="search-table-avatar">{avatar}</div>
          <FlatButton className="search-table-flatbutton" hoverColor="#e7e0d7">
            View profile
          </FlatButton>
        </div>
        <div className="search-table-about">{info}</div>
        <ul className="search-table-contact">{contact}</ul>
      </TableRowColumn>
    </TableRow>
  )
}

export const renderProgram = program => {
  const { id, type, name, description, media, url: contactUrl } = program

  const url = retrieveMedia(media)
  const profileName = <h2>{name}</h2>
  const avatar = <Avatar size={60} src={url} />
  const info = (
    <ul>
      <li>{description}</li>
    </ul>
  )
  const contact = <li>Contact: {contactUrl}</li>
  const rowInfo = {
    id: `${type}_${id}`,
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
    media,
    url: contactUrl
  } = organization

  const url = retrieveMedia(media)
  const profileName = <h2>{name}</h2>
  const avatar = <Avatar size={60} src={url} />
  const info = (
    <ul>
      <li>{addressLine1}</li>
      <li>{addressLine2}</li>
      <li>{addressLine3}</li>
    </ul>
  )
  const contact = <li>Contact: {contactUrl}</li>
  const rowInfo = {
    id: `${type}_${id}`,
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
    media,
    contactUrl
  } = user

  const url = retrieveMedia(media)
  const profileName = (
    <h2>
      {firstName}
      {lastName}
    </h2>
  )
  const avatar = <Avatar size={60} src={url} />
  const info = (
    <ul>
      <li>{mainTitle}</li>
      <li>Working at: {mainLocation}</li>
    </ul>
  )
  const contact = <li>Contact: {contactUrl}</li>
  const rowInfo = {
    id: `${type}_${id}`,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}
