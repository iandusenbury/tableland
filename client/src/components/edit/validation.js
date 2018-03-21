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

export const validateExperiences = values => {
  const errors = {}
  const { existingExp, newExp } = values

  if (existingExp) {
    errors.existingExp = []
    existingExp.forEach(experience => {
      const { name, position, startDate, address, programs } = experience
      const error = {}

      error.name = name ? undefined : 'Required'
      error.position = position ? undefined : 'Required'
      error.startDate = startDate ? undefined : 'Required'
      error.address = address ? undefined : 'Required'

      if (programs && programs.length > 0) {
        error.programs = []
        programs.forEach(program => {
          const {
            name: progName,
            position: progPosition,
            startDate: progStartDate
          } = program
          const progError = {}

          progError.name = progName ? undefined : 'Required'
          progError.position = progPosition ? undefined : 'Required'
          progError.startDate = progStartDate ? undefined : 'Required'
          error.programs.push(progError)
        })
      }

      errors.existingExp.push(error)
    })
  } else if (newExp) {
    errors.newExp = []
    newExp.forEach(experience => {
      const { name, position, startDate, address, programs } = experience
      const error = {}

      error.name = name ? undefined : 'Required'
      error.position = position ? undefined : 'Required'
      error.startDate = startDate ? undefined : 'Required'
      error.address = address ? undefined : 'Required'

      if (programs && programs.length > 0) {
        error.programs = []
        programs.forEach(program => {
          if(!program) return
          const {
            name: progName,
            position: progPosition,
            startDate: progStartDate
          } = program
          const progError = {}

          progError.name = progName ? undefined : 'Required'
          progError.position = progPosition ? undefined : 'Required'
          progError.startDate = progStartDate ? undefined : 'Required'
          error.programs.push(progError)
        })
      }

      errors.newExp.push(error)
    })
  }

  return errors
}

export const validatePersonal = personalInfo => {
  const errors = {}
  const { firstName, lastName } = personalInfo

  if (!firstName) {
    errors.firstName = 'Required'
  } else if (firstName.length > 50) {
    errors.firstName = 'Must be fewer than 50 characters'
  }
  if (!lastName) {
    errors.lastName = 'Required'
  } else if (lastName.length > 50) {
    errors.lastName = 'Must be fewer than 50 characters'
  }

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
