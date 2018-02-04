import React, { Component } from 'react'
import { DatePicker } from 'material-ui'
import { StyledTextField } from "../../widgets/StyledTextField";
import { SaveButton } from "../../widgets/SaveButton";
import { AddButton } from "../../widgets/AddButton";
import './main.css'




class EditProfessional extends Component {


    render() {
        return(
            <div className='fieldsWrapper'>
                <div>
                    <StyledTextField text='Name of Organization'/>
                </div>
                <div>
                    <StyledTextField text='Position or Title'/>
                </div>
                <div>
                    <StyledTextField text='Short Description' multiLine={true}/>
                </div>
                <div>
                    <StyledTextField text='Location of Organization'/>
                </div>
                <div>
                    <DatePicker hintText="Start Date" mode="landscape"/>
                </div>
                <div>
                    <DatePicker hintText="End Date" mode="landscape"/>
                </div>
                <div>
                    <StyledTextField text='Awards/Accomplishments' multiLine={true}/>
                </div>
                <div>
                    <SaveButton/>
                    <AddButton/>
                </div>
            </div>
        )

    }

}

export default EditProfessional;