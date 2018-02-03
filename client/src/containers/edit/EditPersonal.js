import React, { Component } from 'react'
import {
 MenuItem,
 Avatar,
 RaisedButton
} from 'material-ui'
import StyledTextField from '../../widgets/StyledTextField'
import StyledSelectField from '../../widgets/StyledSelectField'
import SaveButton from '../../widgets/SaveButton'
import './main.css'
import Person from 'material-ui/svg-icons/social/person'
import {style} from "../../styles";
import './main.css'



class EditPersonal extends Component{


    render() {
        return(
            <div className='fieldsWrapper'>
                <div className='avatar'>
                    <Avatar icon={<Person/>} size={120} style={style.avatarIcon}/>
                </div>
                <div>
                    <StyledTextField text='Job Title'/>
                </div>
                <div>
                    <StyledTextField text='First Name'/>
                </div>
                <div>
                    <StyledTextField text='LinkedIn User ID'/>
                </div>
                <div>
                    <StyledTextField text='Last Name'/>
                </div>
                <div>
                    <StyledSelectField text='STEM Field'>
                        <MenuItem primaryText='Science'/>
                        <MenuItem primaryText='Technology'/>
                        <MenuItem primaryText='Engineering'/>
                        <MenuItem primaryText='Mathematics'/>
                    </StyledSelectField>
                </div>
                <div>
                    <StyledTextField text='Email'/>
                </div>
                <div>
                    <StyledSelectField text='Private Profile?'>
                        <MenuItem primaryText='Yes'/>
                        <MenuItem primaryText='No'/>
                    </StyledSelectField>
                </div>
                <div>
                    <StyledTextField text='Phone (Optional)'/>
                </div>
                <div>
                    <SaveButton/>
                </div>
            </div>
        )
    }


}


export default EditPersonal;