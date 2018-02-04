import React, {Component} from 'react'
import {
 MenuItem,
 DatePicker,
} from 'material-ui'

import { AddButton } from '../../widgets/AddButton'
import { StyledTextField } from '../../widgets/StyledTextField'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { SaveButton } from '../../widgets/SaveButton'
import './main.css'


class EditEducation extends Component {


        render() {
            return(
                <div className='fieldsWrapper'>
                    <div>
                        <StyledSelectField text='Category of Organization'>
                            <MenuItem primaryText='School'/>
                            <MenuItem primaryText='Club'/>
                            <MenuItem primaryText='Program'/>
                            <MenuItem primaryText='Team'/>
                        </StyledSelectField>
                    </div>
                    <div>
                        <StyledTextField text='Name of Organization'/>
                    </div>
                    <div>
                        <StyledTextField text='Short Description' multiLine={true}/>
                    </div>
                    <div>
                        <StyledTextField text='Position or Title'/>
                    </div>
                    <div>
                        <DatePicker hintText="Start Date" mode="landscape"/>
                    </div>
                    <div>
                        <DatePicker hintText="End Date" mode="landscape"/>
                    </div>
                    <div>
                        <StyledTextField text='Organization Email'/>
                    </div>
                    <div>
                        <StyledTextField text='Location of Organization'/>
                    </div>
                        <StyledTextField text='Awards/Certificates Received' multiLine={true}/>
                    <div>
                        <SaveButton/>
                        <AddButton/>
                    </div>
                </div>
            )

    }

}

export default EditEducation;