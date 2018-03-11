import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { RaisedButton, TextField } from 'material-ui'

const renderTextField = ({ input }) => (
  <div className="navbarSearch">
    <TextField hintText="Search" {...input} />
  </div>
)

const AddAdmin = props => {
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
  input: PropTypes.object.isRequired // eslint-disable-line
}

export default reduxForm({
  form: 'addAdmin'
})(AddAdmin)
