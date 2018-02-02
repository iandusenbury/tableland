import React from 'react'
import {Component} from 'react'
import {style} from "./styles";
import './main.css'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import {FloatingActionButton, RaisedButton} from "material-ui";
import Save from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'


class EditEducation extends Component {


        render() {
            return(
                <div className='fieldsWrapper'>
                    <div>
                        <SelectField
                            floatingLabelText='Select Type of Organization'
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            hintStyle={style.textHint}
                            menuItemStyle={style.textHint}
                            value={null}
                        >
                            <MenuItem primaryText='School'/>
                            <MenuItem primaryText='Club'/>
                            <MenuItem primaryText='Program'/>
                            <MenuItem primaryText='Team'/>
                        </SelectField>
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Name of Organization'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Short Description'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Position or Title'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <DatePicker hintText="Start Date" mode="landscape"/>
                    </div>
                    <div>
                        <DatePicker hintText="End Date" mode="landscape"/>
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Organization Email'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Location of Organization'
                            hintStyle={style.textHint}
                        />
                    </div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Award/Certificate Received'
                            hintStyle={style.textHint}
                        />
                    <div>
                        <RaisedButton label='Save & Done' primary={true} icon={<Save/>}
                                      labelPosition='before'
                                      style={style.button}
                                      buttonStyle={style.buttonStyle}
                        />
                        <RaisedButton label='Add More' primary={true} icon={<ContentAdd/>}
                                      labelPosition='before'
                                      style={style.addButton}
                                      buttonStyle={style.buttonStyle}
                        />
                    </div>
                </div>
            )

    }

}

export default EditEducation;