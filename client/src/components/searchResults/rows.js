import React from 'react'
import { find, propEq } from 'ramda'
import { Avatar } from 'material-ui'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import GroupIcon from 'material-ui/svg-icons/social/group'

// Default Avatar images
const userImage = require('../../assets/images/portrait.png')

const orgIcon = <BusinessIcon />
const progIcon = <GroupIcon />

const getDefaultImage = type => {
  if (type === 'Program') return progIcon
  if (type === 'Organization') return orgIcon

  return userImage
}

// Returns image url belonging to profile or default url
const retrieveMedia = (media, type) => {
  const image = find(propEq('category', 'image'))(media)
  return image && image.url ? image.url : getDefaultImage(type)
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

const getProgramInfo = program => {
  const { id, type, name, description, media, url: contactUrl } = program

  const avatar = getAvatar(media, 'Program')
  const profileName = <h2>{name}</h2>
  const info = (
    <ul>
      <li>{description}</li>
    </ul>
  )
  const contact = <a href={contactUrl}>{contactUrl}</a>
  return {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
}

const getOrganizationInfo = organization => {
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
  return {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
}

const getUserInfo = user => {
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
      {firstName} {lastName}
    </h2>
  )
  const info = (
    <ul>
      <li>{mainTitle}</li>
      <li>Working at: {mainLocation}</li>
    </ul>
  )
  const contact = <a href={contactUrl}>{contactUrl}</a>
  return {
    id,
    type,
    profileName,
    avatar,
    info,
    contact
  }
}

export const getRowInfo = result => {
  const { type } = result
  if (type === 'Program') return getProgramInfo(result)
  if (type === 'Organization') return getOrganizationInfo(result)

  return getUserInfo(result)
}

export default {
  getRowInfo
}
