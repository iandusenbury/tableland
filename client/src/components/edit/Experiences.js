import React , {Component} from 'react'
import { AppBar, IconButton } from 'material-ui'
import {connect } from 'react-redux'
import './experience.css'
import { style } from '../../widgets/styles'
import Location from 'material-ui/svg-icons/communication/location-on'
import { StyledPaper } from '../../widgets/StyledPaper'
import {FieldArray, Field, reduxForm, getFormValues, } from 'redux-form'
import {StyledSelectField} from "../../widgets/StyledSelectField";
import {StyledTextField} from "../../widgets/StyledTextField";
import { DatePicker } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import {AddButton} from "../../widgets/AddButton";
import {RaisedButton } from 'material-ui'
import {printResults} from "./index";
import Existing from '../../containers/experience'

function filterExp(experiences){

    let organizations = []
    let programs = []

    experiences.map((exp, index) => {
        const {
            award,
            current,
            id,
            title,
            type,
            organization,
            program
        } = exp

       let {endDate, startDate} = exp
        if(!endDate){
            endDate = ''
        }else {
            endDate = new Date(endDate)
        }

       startDate = new Date(startDate);
       let orgExp;
       let progExp;
       let address;
       if(organization){
           if( organization.addressLine1 && organization.addressLine2 && organization.addressLine3 ){
               address = organization.addressLine1 + organization.addressLine2 + organization.addressLine3
           }
           else if(organization.addressLine1 && organization.addressLine2 && !organization.addressLine3){
               address = organization.addressLine1 + organization.addressLine2
           }
           else if(organization.addressLine1 && !organization.addressLine2 && !organization.addressLine3){
               address = organization.addressLine1
           }
           else{
               address = ''
           }

           orgExp = {
               name: organization.name,
               address: address,
               city: organization.city,
               country: organization.country,
               state: organization.state,
               postal: organization.postalCode,
               description: organization.description,
               position: title,
               award: award,
               id: 15,
               current: current,
               endDate: endDate,
               startDate: startDate,
               type: type,
               programs: []
           }

           organizations.push(orgExp)

       }
       else if(program){

            progExp = {
                name: program.name,
                description: program.description,
                parentOrganization: exp.parentOrganization,
                position: title,
                award: award,
                id: id,
                current: current,
                endDate: endDate,
                startDate: startDate,
                type: type
            }

            programs.push(progExp)
       }

    })

    programs.map((prog, index) => {
       organizations.map((org, index) => {
           if(prog.parentOrganization == org.id){
               org.programs.push(prog)
           }

       });

    });

    return organizations;
}


const renderExistingExp = ({ fields }) => (
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
)


const renderPrograms = ({ fields }) => (
    <div>
        <div style={{width: "75vw"}}>
            <RaisedButton  onClick={() => fields.push()} label="Add Program" style={{marginTop:'3%',
                marginBottom: '3%'}} fullWidth={true} secondary={true}/>
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






class Experiences extends Component {

    /*componentDidMount(){
        const { fetchProfessional } = this.props
        fetchProfessional(3)
        const {experiences} = this.props
        const exp = {
            existingExp: filterExp(experiences)
        }

        this.props.initialize(exp)
    }*/

    render() {
        const {handleSubmit, submit} = this.props
        return (
            <StyledPaper>
                <div className="EditBoxGrid">
                    <div className="EditLeft">
                        <AppBar
                            iconElementLeft={
                                <IconButton>
                                    <Location/>
                                </IconButton>
                            }
                            title={<span style={style.title}>Experiences</span>}
                            iconStyleLeft={style.appBar}
                        />
                    </div>
                    <div className="EditRight">
                       <Existing/>
                    </div>
                </div>
            </StyledPaper>
        )
    }
}

Experiences = reduxForm({
    form: 'experience',
    onSubmit: printResults
})(Experiences)

export default Experiences;



































/*const renderPrograms = ({ fields }) => (
    <ul>
        <div>
            <RaisedButton  onClick={() => fields.push()} label="Add Program" style={{marginLeft:'30%', marginTop:'5px',
                marginBottom: '10px', position: 'center'}}/>
        </div>
        {fields.map((hobby, index) => (
            <div key={index}>
                <div className="EditOuterDiv" style={{backgroundColor: '#F0FFFF'}}>
                    <div>
                        <Field name="name" component={StyledTextField} text="Name of Program"/>
                    </div>
                    <div>
                        <Field
                            name="position"
                            component={StyledTextField}
                            text="Position/Role"
                        />
                    </div>
                    <div>
                        <Field
                            name="current"
                            component={StyledSelectField}
                            text="Current Position?">
                            <MenuItem value="No" primaryText="No" />
                            <MenuItem value="Yes" primaryText="Yes" />
                        </Field>
                    </div>
                    <div>
                        <Field
                            name="awards"
                            component={StyledTextField}
                            text="Awards Received"
                            multiLine
                        />
                    </div>
                    <div>
                        <Field
                            name="start"
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="Start Date"
                            mode="landscape"
                        />
                    </div>
                    <div>
                        <Field
                            name="end"
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="End Date"
                            mode="landscape"
                        />
                    </div>
                    <div>
                        <Field
                            name="address"
                            component={StyledTextField}
                            text="Address"
                            multiLine
                        />
                    </div>
                    <div>
                        <Field
                            name="city"
                            component={StyledTextField}
                            text="City"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="state"
                            component={StyledTextField}
                            text="State"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="postal"
                            component={StyledTextField}
                            text="Postal Code"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="country"
                            component={StyledTextField}
                            text="Country"
                            disabled
                        />
                    </div>
                </div>
            </div>
        ))}
    </ul>
)


const renderNewExp = ({ fields }) => (
    <ul>
        <div>
            <RaisedButton onClick={() => fields.push({})} label="Add Experiences"  fullWidth={true} secondary={true}
            style={{marginRight:'10%'}}/>
        </div>
        {fields.map((member, index) => (
            <div key={index}>
                <div className="EditOuterDiv">
                    <div>
                        <Field name={`${member}.name`} component={StyledTextField} text="Name of Organization" />
                    </div>
                    <div>
                        <Field
                            name={`${member}.position`}
                            component={StyledTextField}
                            text="Position/Role"
                        />
                    </div>
                    <div>
                        <Field
                            name="current"
                            component={StyledSelectField}
                            text="Current Position?">
                            <MenuItem value="No" primaryText="No" />
                            <MenuItem value="Yes" primaryText="Yes" />
                        </Field>
                    </div>
                    <div>
                        <Field
                            name="awards"
                            component={StyledTextField}
                            text="Awards Received"
                            multiLine
                        />
                    </div>
                    <div>
                        <Field
                            name="start"
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="Start Date"
                            mode="landscape"
                        />
                    </div>
                    <div>
                        <Field
                            name="end"
                            component={DatePicker}
                            style={style.datePicker}
                            hintText="End Date"
                            mode="landscape"
                        />
                    </div>
                    <div>
                        <Field
                            name="address"
                            component={StyledTextField}
                            text="Address"
                            multiLine
                        />
                    </div>
                    <div>
                        <Field
                            name="city"
                            component={StyledTextField}
                            text="City"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="state"
                            component={StyledTextField}
                            text="State"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="postal"
                            component={StyledTextField}
                            text="Postal Code"
                            disabled
                        />
                    </div>
                    <div>
                        <Field
                            name="country"
                            component={StyledTextField}
                            text="Country"
                            disabled
                        />
                    </div>
                </div>
                <div style={{margin: '5px'}}>
                    <FieldArray name={`${member}.programs`} component={renderPrograms} />
                </div>
            </div>
        ))}
    </ul>
)


function reduceProps(experience){

    const type = experience.organization ? experience.organization : experience.program
    return{
        name: type.name,
        position: experience.title,
        award: experience.award,
        current: experience.current,
        state: type.state,
        city: type.city,
        country: type.country,
        postal: type.postalCode
    }
}



const renderExp = ({ fields }) => (
    <ul>
        {fields.map((experience, index) => {
            return (
                <div key={index}>
                    <AddExperience {...reduceProps(experience)} />
                    <FieldArray name={`${experience}.hobbies`} component={renderPrograms}/>
                </div>
            )
        })}
    </ul>
)



class Experiences extends Component {

   componentDidMount(){
        const sample = {
            experience: [
                {
                    name: "Intel",
                    position: "engineer"
                },

                {
                    name: "Google",
                    position: "manager",
                    program: [{}]
                }
            ]
        }

        this.props.initialize(sample)
    }

    render() {
        return (
            <StyledPaper>
                <div className="EditBoxGrid">
                    <div className="EditLeft">
                        <AppBar
                            iconElementLeft={
                                <IconButton>
                                    <Location/>
                                </IconButton>
                            }
                            title={<span style={style.title}>Experiences</span>}
                            iconStyleLeft={style.appBar}
                        />
                    </div>
                    <form>
                        <div className="EditRight">
                            <FieldArray name="experience" component={renderNewExp} />
                        </div>
                    </form>
                </div>
            </StyledPaper>
        )
    }
}

Experiences = reduxForm({
    form: 'experience',
    enableReinitialize: true
})(Experiences)

export default Experiences;
*/