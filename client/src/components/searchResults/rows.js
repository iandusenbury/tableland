import React from 'react'
import { Avatar } from 'material-ui'

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

export const getProgramInfo = program => {
  const { id, type, name, description, imageUrl, url: contactUrl } = program

  const avatar = getAvatar(imageUrl)
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
