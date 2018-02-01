import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const dummyList = [
  {
    id: 1,
    first_name: 'First',
    last_name: 'Last',
    org_name: 'My organization',
    linkedin_id: 'flast',
    contact_url: 'mywebsite@url.com',
  },
  {
    id: 2,
    first_name: 'Mike',
    last_name: 'Wazowski',
    org_name: 'Monsters Inc.',
    linkedin_id: 'mwazowski',
    contact_url: 'mwaz@monsters.inc',
  },
  {
    id: 3,
    first_name: 'Mr.',
    last_name: 'Bean',
    org_name: 'British Comedy',
    linkedin_id: 'mmmmmm',
    contact_url: 'mrbean@funny.org',
  },
  {
    id: 4,
    first_name: 'Howard',
    last_name: 'Shore',
    org_name: 'Composers International',
    linkedin_id: 'hshore',
    contact_url: 'howard@shore.com',
  },
  {
    id: 5,
    first_name: 'Emperor',
    last_name: 'Kuzco',
    org_name: 'My Kingdom',
    linkedin_id: 'AlmightyEmperorKuzco',
    contact_url: 'king@snailmail.gov',
  },

]

const userTables = [
  {
    id: 0,
    title: 'New Users',
    list: dummyList,
    button1: 'Approve',
    button2: 'Deny',
  },
  {
    id: 1,
    title: 'Remove Users',
    list: dummyList,
    button1: 'Block',
    button2: 'Unblock',
  },
  {
    id: 2,
    title: 'Elevate Users',
    list: dummyList,
    button1: 'Elevate',
    button2: 'Remove',
  },
]

const initialState = {
  tables: userTables,
  currentTable: userTables[2],
  isAdmin: true,
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.ADMIN_CHANGE_TABLE]: adminChangeTable,
  [ActionTypes.ADMIN_CHANGE_ADMIN]: adminChangeAdmin,
}

export default createReducer(initialState, handlers)

function adminChangeTable(state, { payload }) {
  const { index } = payload
  const { currentTable, tables } = state

  return {
    ...state,
    currentTable: tables[index],
  }
}

function adminChangeAdmin(state, { payload }) {
  const { changeTo } = payload
  const { isAdmin } = state

  return {
    ...state,
    isAdmin: changeTo,
  }
}
