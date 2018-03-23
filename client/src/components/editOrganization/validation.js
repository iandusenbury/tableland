export const validateField = info => (info ? null : 'Required')

export const validateYouTubeUrl = url => {
  if (!!url && (!url.includes('youtube.com') || !url.includes('watch?v=')))
    return 'Must be a YouTube link'

  return null
}

const maxLength = max => value =>
  value && value.length > max ? `Must be fewer than ${max} characters.` : null

export const maxLength1000 = maxLength(1000)
export const maxLength255 = maxLength(255)

export const validateAbout = personalInfo => {
  const errors = {}
  const { name, address } = personalInfo

  if (!name) {
    errors.name = 'Required'
  } else if (name.length > 50) {
    errors.name = 'Must be fewer than 50 characters'
  }
  errors.address = address ? undefined : 'Required'

  return errors
}

export const validateMedia = media => {
  const errors = {}
  const { profileVideo } = media

  if (
    !!profileVideo &&
    (!profileVideo.includes('youtube.com') ||
      !profileVideo.includes('watch?v='))
  )
    errors.profileVideo = 'Must be a YouTube link'

  return errors
}

export default {
  validateField,
  maxLength1000,
  maxLength255
}
