import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Save from 'material-ui/svg-icons/content/save'

import {style} from "../styles"

const SaveButton = () => {

    return (
        <RaisedButton
            label='Save & Done'
            primary={true} icon={<Save/>}
            labelPosition='before'
            style={style.button}
            buttonStyle={style.buttonStyle}
        />
    )
}

export default SaveButton;