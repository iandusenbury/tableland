import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableRowColumn, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'
import '../../components/searchResults/style.css'

const getUrl = type => {
  if (type === 'User') {
    return 'roadmap'
  }
  if (type === 'Organization') {
    return 'organization'
  }
  if (type === 'Program') {
    return 'program'
  }
  return null
}

const SearchResultRow = props => {
  const { type, id, profileName, avatar, info, contact } = props

  const profileType = getUrl(type)
  const buttonText = profileType === 'roadmap' ? 'View Roadmap' : 'View Profile'

  return (
    <TableRow className="search-table-row-stripe">
      <TableRowColumn className="search-table-cell">
        <div className="search-table-name search-table-border">
          {profileName}
        </div>
        <div className="search-table-icon search-table-border">
          <div className="search-table-avatar">{avatar}</div>
          <FlatButton
            containerElement={<Link to={`/${profileType}/${id}`} />}
            className="search-table-flatbutton"
            hoverColor="#e7e0d7">
            {buttonText}
          </FlatButton>
        </div>
        <div className="search-table-about">{info}</div>
        <ul className="search-table-contact">Contact: {contact}</ul>
      </TableRowColumn>
    </TableRow>
  )
}

SearchResultRow.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  profileName: PropTypes.element.isRequired,
  avatar: PropTypes.element.isRequired,
  info: PropTypes.element.isRequired,
  contact: PropTypes.element.isRequired
}

export default SearchResultRow
