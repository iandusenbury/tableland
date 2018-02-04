import React from 'react'
import SelectField from 'material-ui/SelectField'

import {style} from "../styles"

export const StyledSelectField = (props) => {
    const { text, children } = props;

    return (
        <SelectField
            floatingLabelText={text}
            underlineStyle={style.textFieldUnderline}
            floatingLabelStyle={style.textFloating}
            hintStyle={style.textHint}
            menuItemStyle={style.textHint}
            value={null}
        >
            {children}
        </SelectField>
    )
}
