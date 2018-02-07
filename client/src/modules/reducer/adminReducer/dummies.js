import React from 'react'
import Add from 'material-ui/svg-icons/content/add'
import Block from 'material-ui/svg-icons/content/block'
import SwapVert from 'material-ui/svg-icons/action/swap-vert'

const dummyList = [
  {
    id: 1,
    firstName: 'First',
    lastName: 'Last',
    title: 'Employee',
    orgName: 'My organization',
    linkedinId: 'flast',
    contactUrl: 'mywebsite@url.com',
  },
  {
    id: 2,
    firstName: 'Mike',
    lastName: 'Wazowski',
    title: 'Scare Floor Technician',
    orgName: 'Monsters Inc.',
    linkedinId: 'mwazowski',
    contactUrl: 'mwaz@monsters.inc',
  },
  {
    id: 3,
    firstName: 'Mr.',
    lastName: 'Bean',
    title: 'Funny Man',
    orgName: 'British Comedy',
    linkedinId: 'mmmmmm',
    contactUrl: 'mrbean@funny.org',
  },
  {
    id: 4,
    firstName: 'Howard',
    lastName: 'Shore',
    title: 'Composer',
    orgName: 'Composers International',
    linkedinId: 'hshore',
    contactUrl: 'howard@shore.com',
  },
  {
    id: 5,
    firstName: 'Emperor',
    lastName: 'Kuzco',
    title: 'The Emperor',
    orgName: 'My Kingdom',
    linkedinId: 'AlmightyEmperorKuzco',
    contactUrl: 'king@snailmail.gov',
  },

]

export const userTables = [
  {
    id: 0,
    title: 'New Users',
    list: dummyList,
    button1: 'Approve',
    button2: 'Deny',
    buttonIcon: <Add />,
  },
  {
    id: 1,
    title: 'Remove Users',
    list: dummyList,
    button1: 'Block',
    button2: 'Unblock',
    buttonIcon: <Block />,
  },
  {
    id: 2,
    title: 'Elevate Users',
    list: dummyList,
    button1: 'Elevate',
    button2: 'Remove',
    buttonIcon: <SwapVert />,
  },
]
