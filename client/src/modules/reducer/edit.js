import { find, propEq, update, findIndex, dissoc, append } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const portraitImg = require('../../assets/images/portrait.png')

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  visible: true,
  signedIn: false,
  isAdmin: false,
  isSuperAdmin: false,
  media: {
    image: {
      url: ''
    },
    video: {
      url: '',
      id: ''
    }
  },
  experiences: [],
  existingExp: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_USER]: requestUser,
  [ActionTypes.RECIEVE_USER]: formatExistingExp,
  [ActionTypes.LOGOUT_USER]: clearUser,
  [ActionTypes.SUCCESS_CREATE_EXPERIENCE]: updateUser,
  [ActionTypes.SUCCESS_CREATE_EXPERIENCE]: addExistingExp
}

export default createReducer(initialState, handlers)

function addExistingExp(state, { payload }) {
  const { existingExp } = state
  const { experience } = payload
  const {
    endDate,
    startDate,
    award,
    current,
    id,
    title,
    type,
    organization,
    program,
    parentOrganization: orgId
  } = experience

  const dateifiedEndDate = endDate === null ? null : new Date(endDate)
  const dateifiedStartDate = new Date(startDate)

  if (organization) {
    // clean this up
    const orgExp = {
      name: organization.name,
      address: organization.addressLine1,
      city: organization.city,
      country: organization.country,
      state: organization.state,
      postal: organization.postalCode,
      description: organization.description,
      position: title,
      award,
      id: organization.id,
      current,
      endDate: dateifiedEndDate,
      startDate: dateifiedStartDate,
      type,
      expId: id,
      programs: []
    }

    return {
      ...state,
      existingExp: [...existingExp, orgExp]
    }
  }

  if (orgId) {
    const progExp = {
      name: program.name,
      position: title,
      award,
      current,
      endDate: dateifiedEndDate,
      startDate: dateifiedStartDate
    }
    const exp = find(propEq('id', orgId))(existingExp)
    const expIndex = findIndex(propEq('id', orgId))(existingExp)
    const { programs } = exp
    const mergedPrograms = append(progExp, programs)
    const newExp = { ...exp, programs: mergedPrograms }
    const updatedExp = update(expIndex, newExp, existingExp)

    return {
      ...state,
      existingExp: [...updatedExp]
    }
  }

  return {
    ...state
  }
}

function formatExistingExp(state, { payload }) {
  const { user: { experiences } } = payload
  const organizations = []
  const programs = []

  experiences.forEach(exp => {
    const {
      endDate,
      startDate,
      award,
      current,
      id,
      title,
      type,
      organization,
      program
    } = exp

    const dateifiedEndDate = endDate === null ? '' : new Date(endDate)
    const dateifiedStartDate = new Date(startDate)

    let orgExp
    let progExp

    if (organization) {
      // clean this up
      orgExp = {
        name: organization.name,
        address: organization.addressLine1,
        city: organization.city,
        country: organization.country,
        state: organization.state,
        postal: organization.postalCode,
        description: organization.description,
        position: title,
        award,
        id: organization.id,
        current,
        endDate: dateifiedEndDate,
        startDate: dateifiedStartDate,
        type,
        expId: id,
        programs: []
      }

      organizations.push(orgExp)
    } else if (program) {
      progExp = {
        name: program.name,
        description: program.description,
        parentOrganization: exp.parentOrganization,
        position: title,
        award,
        id,
        current,
        endDate: dateifiedEndDate,
        startDate: dateifiedStartDate,
        type,
        expId: id
      }

      programs.push(progExp)
    }
  })

  programs.forEach(prog => {
    organizations.forEach(org => {
      if (prog.parentOrganization === org.id) {
        org.programs.push(prog)
      }
    })
  })

  return {
    ...state,
    existingExp: [...organizations]
  }
}

function requestUser(state, { payload }) {
  const { user } = payload
  const { media } = user

  const image = find(propEq('category', 'image'))(media)
  const video = find(propEq('category', 'video'))(media)

  return {
    ...state,
    ...user,
    media: {
      image: image || { url: portraitImg },
      video: video || { url: '' }
    },
    signedIn: true,
    isAdmin: user.role !== 'user',
    isSuperAdmin: user.role === 'super_admin'
  }
}

function updateUser(state, { payload }) {
  const { experiences } = state
  const { experience } = payload

  const { endDate, startDate } = experience

  const dateifiedEndDate = endDate === null ? null : new Date(endDate)
  const dateifiedStartDate = new Date(startDate)

  const dateifiedExperience = {
    ...experience,
    startDate: dateifiedStartDate,
    endDate: dateifiedEndDate
  }

  return {
    ...state,
    experiences: [...experiences, dissoc('user', dateifiedExperience)]
  }
}

function clearUser() {
  return {
    ...initialState
  }
}
