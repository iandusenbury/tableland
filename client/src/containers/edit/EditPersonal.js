import React, { Component } from 'react'
import {
 MenuItem,
 SelectField,
 Avatar,
 RaisedButton
} from 'material-ui'
import StyledTextField from '../../widgets/StyledTextField'
import './main.css'
import Person from 'material-ui/svg-icons/social/person'
import Save from 'material-ui/svg-icons/content/save'
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
                    <SelectField
                        floatingLabelText='STEM Field'
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        hintStyle={style.textHint}
                        menuItemStyle={style.textHint}
                        value={null}
                    >
                        <MenuItem primaryText='Science'/>
                        <MenuItem primaryText='Technology'/>
                        <MenuItem primaryText='Engineering'/>
                        <MenuItem primaryText='Mathematics'/>
                    </SelectField>
                </div>
                <div>
                    <StyledTextField text='Email'/>
                </div>
                <div>
                    <SelectField
                        floatingLabelText='Private Profile?'
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        hintStyle={style.textHint}
                        menuItemStyle={style.textHint}
                        value={null}
                    >
                        <MenuItem primaryText='Yes'/>
                        <MenuItem primaryText='No'/>
                    </SelectField>
                </div>
                <div>
                    <StyledTextField text='Phone (Optional)'/>
                </div>
                <div>
                    <RaisedButton
                        label='Save & Done'
                        primary={true} icon={<Save/>}
                        labelPosition='before'
                        style={style.button}
                        buttonStyle={style.buttonStyle}
                    />
                </div>
            </div>
        )
    }


}


export default EditPersonal;