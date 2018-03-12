import React , {Component} from 'react'
import './experience.css'
import { style } from '../../widgets/styles'
import {FieldArray, Field, reduxForm, getFormValues, } from 'redux-form'
import {StyledSelectField} from "../../widgets/StyledSelectField";
import {StyledTextField} from "../../widgets/StyledTextField";
import { DatePicker } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import {RaisedButton } from 'material-ui'
import {showResults} from "./index";


const renderNewExp = ({ fields }) => (
    <div>
        <div style={{marginTop: "4%", marginBottom: "4%", width: "75vw"}}>
            <RaisedButton onClick={() => fields.push({})} label="Add Experiences"  fullWidth={true} secondary={true}
                          style={{marginRight:'10%'}}/>
        </div>
        <div>
            {fields.map((exp, index) => (
                <div key={index}>
                    <div className="EditOuterDiv">
                        <div>
                            <Field name={`${exp}.name`} component={StyledTextField} text="Name of Organization" />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.position`}
                                component={StyledTextField}
                                text="Position/Role"
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.current`}
                                component={StyledSelectField}
                                text="Current Position?">
                                <MenuItem value={false} primaryText="No" />
                                <MenuItem value={true} primaryText="Yes" />
                            </Field>
                        </div>
                        <div>
                            <Field
                                name={`${exp}.award`}
                                component={StyledTextField}
                                text="Awards Received"
                                multiLine
                            />
                        </div>
                        <div style={{marginTop: '6%'}}>
                            <Field
                                name={`${exp}.startDate`}
                                component={DatePicker}
                                style={style.datePicker}
                                hintText="Start Date"
                                mode="landscape"
                            />
                        </div>
                        <div style={{marginTop: '6%'}}>
                            <Field
                                name={`${exp}.endDate`}
                                component={DatePicker}
                                style={style.datePicker}
                                hintText="End Date"
                                mode="landscape"
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.address`}
                                component={StyledTextField}
                                text="Address"
                                multiLine
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.city`}
                                component={StyledTextField}
                                text="City"
                                disabled
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.state`}
                                component={StyledTextField}
                                text="State"
                                disabled
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.postal`}
                                component={StyledTextField}
                                text="Postal Code"
                                disabled
                            />
                        </div>
                        <div>
                            <Field
                                name={`${exp}.country`}
                                component={StyledTextField}
                                text="Country"
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <FieldArray name={`${exp}.programs`} component={renderPrograms} />
                    </div>
                </div>
            ))}
        </div>
    </div>
)



const renderPrograms = ({ fields }) => (
    <div>
        <div style={{width: "50vw", marginLeft:'15%', marginRight: '15%'}}>
            <RaisedButton  onClick={() => fields.push()} label="Add Program" style={{marginTop:'3%',
                marginBottom: '3%'}} fullWidth={true} primary={true}/>
        </div>
        {fields.map((program, index) => (
            <div key={index} style={{width: "75vw", marginBottom: '2%', marginTop:'2%'}}>
                <div className="EditOuterDiv" style={{backgroundColor: '#F0FFFF'}}>
                    <div>
                        <Field name={`${program}.name`} component={StyledTextField} text="Name of Program"/>
                    </div>
                    <div>
                        <Field
                            name={`${program}.position`}
                            component={StyledTextField}
                            text="Position/Role"
                        />
                    </div>
                    <div>
                        <Field
                            name={`${program}.current`}
                            component={StyledSelectField}
                            text="Current Position?">
                            <MenuItem value={false} primaryText="No" />
                            <MenuItem value={true} primaryText="Yes" />
                        </Field>
                    </div>
                    <div>
                        <Field
                            name={`${program}.award`}
                            component={StyledTextField}
                            text="Awards Received"
                            multiLine
                        />
                    </div>
                    <div>
                        <Field
                            name={`${program}.startDate`}
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="Start Date"
                            mode="landscape"
                        />
                    </div>
                    <div>
                        <Field
                            name={`${program}.endDate`}
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="End Date"
                            mode="landscape"
                        />
                    </div>
                </div>
            </div>
        ))}
    </div>
)






class NewExperiences extends Component {

    render() {
        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <FieldArray name="newExp" component={renderNewExp} />
            </form>
        )
    }
}

NewExperiences = reduxForm({
    form: 'newExperiences',
    onSubmit: showResults
})(NewExperiences)

export default NewExperiences;