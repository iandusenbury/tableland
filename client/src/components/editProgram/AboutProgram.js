import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import Company from 'material-ui/svg-icons/communication/business'
import { Field, reduxForm } from 'redux-form'
import '../editOrganization/editOrg.css'
import {validateAbout} from "../editOrganization/validation";

const About = props => {
    const { handleSubmit } = props

    return (
        <StyledPaper>
            <div className="orgSectionGrid">
                <div>
                    <AppBar
                        iconElementLeft={
                            <IconButton>
                                <Company />
                            </IconButton>
                        }
                        title={<span style={style.title}>Information</span>}
                        iconStyleLeft={style.appBar}
                        style={style.organizationAppBar}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="orgFieldsGrid">
                        <div>
                            <Field
                                name="name"
                                component={StyledTextField}
                                text="Program Name"
                                required
                                org
                            />
                        </div>
                        <div>
                            <Field
                                name="url"
                                component={StyledTextField}
                                text="Website Link"
                                multiLine
                                org
                            />
                        </div>
                        <div>
                            <Field
                                name="description"
                                component={StyledTextField}
                                text="Description"
                                multiLine
                                org
                            />
                        </div>
                    </div>
                </form>
            </div>
        </StyledPaper>
    )
}

export default reduxForm({
    form: 'aboutProgram',
    enableReinitialize: true,
    validate: validateAbout
})(About)
