import React from 'react'
import {
    AppBar,
    IconButton,
    Avatar
}from 'material-ui'
import './edit.css'
import {style} from "../../widgets/styles";
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import Person from 'material-ui/svg-icons/social/person'
import {ChangeButton} from "../../widgets/ChangeButton";
import {AddVideo} from "../../widgets/AddVideo";
import {StyledPaper} from "../../widgets/StyledPaper";

const videoPlayer = require('./VideoPlaceholder.jpg')

export const Media = (props) => {

    return(
        <StyledPaper>
            <div className="sectionGrid">
                <div>
                    <AppBar
                        iconElementLeft={<IconButton><Photo/></IconButton>}
                        title={<span style={style.title}>Media</span>}
                    />
                </div>
                <div className="mediaGrid">
                    <div>
                        <div className="avatar">
                            <Avatar icon={<Person/>} size={158} style={style.avatarIcon}/>
                        </div>
                        <ChangeButton/>
                    </div>
                    <div>
                        <div className="video">
                            <img className="image" src={videoPlayer} />
                        </div>
                        <AddVideo/>
                    </div>
                </div>
            </div>
        </StyledPaper>
    )
}