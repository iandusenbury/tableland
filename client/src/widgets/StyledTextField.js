import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'



export const StyledTextField = (props) => {
    const { text, multiLine } = props;
    const isMultiLine = multiLine ? true : false ;

    return (
        <TextField
            underlineStyle={style.textFieldUnderline}
            floatingLabelStyle={style.textFloating}
            floatingLabelFocusStyle={style.textFloating}
            hintStyle={style.textHint}
            multiLine={isMultiLine}
            floatingLabelText={text}
        />
    )
}