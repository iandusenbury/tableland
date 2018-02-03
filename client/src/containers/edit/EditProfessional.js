import React, { Component } from 'react'
import
{
    TextField,
    DatePicker,
    RaisedButton,
} from 'material-ui'
import Save from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {style} from "../../styles";
import './main.css'




class EditProfessional extends Component {


    render() {
        return(
            <div className='fieldsWrapper'>
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
                        floatingLabelText='Position or Title'
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <TextField
                        underlineStyle={style.textFieldUnderline}
                        floatingLabelStyle={style.textFloating}
                        floatingLabelFocusStyle={style.textFloating}
                        floatingLabelText='Short Description'
                        multiLine={true}
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
                        floatingLabelText='Awards/Accomplishments'
                        multiLine={true}
                        hintStyle={style.textHint}
                    />
                </div>
                <div>
                    <RaisedButton
                        label='Save & Done' primary={true} icon={<Save/>}
                        labelPosition='before'
                        style={style.button}
                        buttonStyle={style.buttonStyle}
                    />
                    <RaisedButton
                        label='Add More' primary={true} icon={<ContentAdd/>}
                        labelPosition='before'
                        style={style.addButton}
                        buttonStyle={style.buttonStyle}
                    />
                </div>
            </div>
        )

    }

}

export default EditProfessional;