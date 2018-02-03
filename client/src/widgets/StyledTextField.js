import React from 'react'
import TextField from 'material-ui/TextField'

import {style} from "../styles"

const StyledTextField = (props) => {
    const { text } = props;

    return (
            <TextField
                underlineStyle={style.textFieldUnderline}
                floatingLabelStyle={style.textFloating}
                floatingLabelFocusStyle={style.textFloating}
                hintStyle={style.textHint}
                floatingLabelText={text}
            />
        )
}

export default StyledTextField;