import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { RaisedButton, TextField } from 'material-ui'
import '../navbar/style.css'

const renderTextField = ({ input }) => (
  <div className="navbarSearch">
    <TextField hintText="Search" {...input} />
  </div>
)

const SearchBar = props => {
  const { fetchResults, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit(fetchResults)} className="navbarSearchForm">
      <Field name="searchKey" component={renderTextField} />
      <RaisedButton className="navbarSubmit" type="submit" label="Search" />
    </form>
  )
}

SearchBar.propTypes = {
  fetchResults: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

renderTextField.propTypes = {
  input: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

export default reduxForm({
  form: 'searchBar'
})(SearchBar)
