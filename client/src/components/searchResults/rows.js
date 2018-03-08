import React from 'react'
import { Avatar } from 'material-ui'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import GroupIcon from 'material-ui/svg-icons/social/group'
import SearchResultRow from '../../containers/searchResultRow'

// Default Avatar images
const userImage = require('../../assets/images/portrait.png')

const orgIcon = <BusinessIcon />
const progIcon = <GroupIcon />

const getDefaultImage = type => {
  if (type === 'Program') return orgIcon
  if (type === 'Organization') return progIcon

  return userImage
}

// Returns image url belonging to profile or default url
const retrieveMedia = (media, type) => {
  const mediaObj = media.reduce((obj, item) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    obj[item.category] = item
    return obj
  }, {})
  return mediaObj.image ? mediaObj.image.url : getDefaultImage(type)
}

// Returns an Avatar component with either a photo or icon
const getAvatar = (media, type) => {
  const url = retrieveMedia(media, type)
  const avatar =
    typeof url === 'string' ? (
      <Avatar size={60} src={url} />
    ) : (
      <Avatar size={60} icon={url} />
    )

  return avatar
}

export const renderProgram = program => {
  const { id, type, name, description, media, url: contactUrl } = program

  const avatar = getAvatar(media, 'Program')
  const profileName = <h2>{name}</h2>
  const info = (
    <ul>
      <li>{description}</li>
    </ul>
  )
  const contact = <a href={contactUrl}>{contactUrl}</a>
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return <SearchResultRow {...rowInfo} />
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
    media,
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

  const avatar = getAvatar(media, 'Organization')
  const profileName = <h2>{name}</h2>
  const info = (
    <ul>{address.map((line, index) => <li key={index}>{line}</li>)}</ul> // eslint-disable-line
  )
  const contact = <a href={contactUrl}>{contactUrl}</a>
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return <SearchResultRow {...rowInfo} />
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

  const avatar = getAvatar(media, 'User')
  const profileName = (
    <h2>
      {firstName}
      {lastName}
    </h2>
  )
  const info = (
    <ul>
      <li>{mainTitle}</li>
      <li>Working at: {mainLocation}</li>
    </ul>
  )
  const contact = <a href={contactUrl}>{contactUrl}</a>
  const rowInfo = {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
  return <SearchResultRow {...rowInfo} />
}
