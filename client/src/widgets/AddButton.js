import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {style} from "../styles"

export const AddButton = () => {

    return (
        <RaisedButton
            label='Add More' primary={true} icon={<ContentAdd/>}
            labelPosition='before'
            style={style.addButton}
            buttonStyle={style.buttonStyle}
        />
    )
}
