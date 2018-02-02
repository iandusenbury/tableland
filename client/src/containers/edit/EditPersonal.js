import React from 'react'
import { Component } from 'react'
import './main.css'
import MenuItem from 'material-ui/MenuItem'
import Person from 'material-ui/svg-icons/social/person'
import TextField from 'material-ui/TextField'
import Save from 'material-ui/svg-icons/content/save'
import SelectField from 'material-ui/SelectField'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import { style }from './styles'





class PersonalEdit extends Component{


    render() {
        return(
            <div className='fieldsWrapper'>
                <div className='avatar'>
                    <Avatar icon={<Person/>} size={120} style={style.avatarIcon}/>
                </div>
                <div>
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='Job Title'
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='First Name'
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='LinkedIn User ID'
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='Last Name'
                        hintStyle={style.textHint}
                    />
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
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='Email'
                        hintStyle={style.textHint}
                    />
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
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='Phone (Optional)'
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <RaisedButton label='Save & Done' primary={true} icon={<Save/>}
                                  labelPosition='before'
                                  style={style.button}
                                  buttonStyle={style.buttonStyle}
                    />
                </div>
            </div>
        )
    }


}


export default PersonalEdit;