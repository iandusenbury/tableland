import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {style} from "./styles"

export const AddVideo = (props) => {

    return (
        <RaisedButton
            label="Add Video" primary={true} icon={<ContentAdd/>}
            labelPosition='after'
            style={style.addVideo}
            buttonStyle={style.buttonStyle}
        />
    )
}