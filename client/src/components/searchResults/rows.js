import React from 'react'
import { TableRow, TableRowColumn, Avatar, FlatButton } from 'material-ui'

const retrieveMedia = media => {
  const { image: { url } } = media.reduce((obj, item) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    obj[item.category] = item
    return obj
  }, {})
  return url
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
  const { id, name, description, media, url: contactUrl } = program

  const url = retrieveMedia(media)
  // console.log(findAvatar)
  // console.log(url)
  // const displayAvatar = require('./portrait.png')
  const profileName = <h2>{name}</h2>
  const avatar = <Avatar size={60} src={url} />
  const info = (
    <ul>
      <li>{description}</li>
    </ul>
  )
  const contact = <li>Contact: {contactUrl}</li>
  const rowInfo = {
    id,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}

export const renderOrganization = organization => {
  const { id, name, addressLine1, media, contactUrl } = organization

  const url = retrieveMedia(media)
  // console.log(findAvatar)
  // console.log(url)
  // const displayAvatar = require('./portrait.png')
  const profileName = <h2>{name}</h2>
  const avatar = <Avatar size={60} src={url} />
  const info = (
    <ul>
      <li>{addressLine1}</li>
    </ul>
  )
  const contact = <li>Contact: {contactUrl}</li>
  const rowInfo = {
    id,
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
    firstName,
    lastName,
    mainTitle,
    mainLocation,
    media,
    contactUrl
  } = user

  const url = retrieveMedia(media)
  // console.log(findAvatar)
  // console.log(url)
  // const displayAvatar = require('./portrait.png')
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
    id,
    profileName,
    avatar,
    info,
    contact
  }
  return tableRow(rowInfo)
}

export default {
  renderUser,
  renderProgram,
  renderOrganization
}
