import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableRowColumn, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'
import '../../components/searchResults/style.css'

const getButton = (type, id, fetchMapProfessional) => {
  if (type === 'User') {
    return (
      <FlatButton
        onClick={() => fetchMapProfessional(id)}
        className="search-table-flatbutton"
        hoverColor="#e7e0d7">
        View Roadmap
      </FlatButton>
    )
  }
  if (type === 'Organization') {
    return (
      <FlatButton
        containerElement={<Link to={`/organization/${id}`} />}
        className="search-table-flatbutton"
        hoverColor="#e7e0d7">
        View Profile
      </FlatButton>
    )
  }
  return null
}

const SearchResultRow = props => {
  const {
    type,
    id,
    profileName,
    avatar,
    info,
    contact,
    fetchMapProfessional
  } = props
  return (
    <TableRow className="search-table-row-stripe">
      <TableRowColumn className="search-table-cell">
        <div className="search-table-name search-table-border">
          {profileName}
        </div>
        <div className="search-table-icon search-table-border">
          <div className="search-table-avatar">{avatar}</div>
          {getButton(type, id, fetchMapProfessional)}
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
  contact: PropTypes.element.isRequired,
  fetchMapProfessional: PropTypes.func.isRequired
}

export default SearchResultRow
