import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { RaisedButton, TextField } from 'material-ui'

const validate = values => {
  const errors = {}
  const requiredFields = ['email']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, meta: { touched, error } }) => (
  <div>
    <TextField
      hintText="Email"
      errorText={touched && error}
      floatingLabelText="Email"
      {...input}
    />
  </div>
)

const AddAdminForm = props => {
  const { handleSubmit, pristine, submitting, type, typeId, addAdmin } = props
  const submitHandler = values => addAdmin(values.email, type, typeId)

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <Field name="email" component={renderTextField} />
        <RaisedButton
          backgroundColor="#8195b1"
          type="submit"
          label="Add Admin"
          disabled={pristine || submitting}
        />
      </div>
    </form>
  )
}

AddAdminForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
  addAdmin: PropTypes.func.isRequired
}

renderTextField.propTypes = {
  meta: PropTypes.object.isRequired, // eslint-disable-line
  input: PropTypes.object.isRequired // eslint-disable-line
}

export default reduxForm({
  form: 'addAdminForm',
  validate
})(AddAdminForm)
