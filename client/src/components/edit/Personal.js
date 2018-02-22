import React from 'react'
import {Paper,
        AppBar,
        IconButton
}from 'material-ui'
import {StyledTextField} from "../../widgets/StyledTextField";
import './edit.css'
import {style} from "../../widgets/styles";
import Person from 'material-ui/svg-icons/social/person'
import {StyledPaper} from "../../widgets/StyledPaper";

export const Personal = (props) => {

    return(
        <StyledPaper>
            <div className="sectionGrid">
                <div>
                    <AppBar
                        iconElementLeft={<IconButton><Person/></IconButton>}
                        title={<span style={style.title}>Personal</span>}
                    />
                </div>
                <div className="fieldsGrid">
                    <div>
                        <StyledTextField text="First Name"/>
                    </div>
                    <div>
                        <StyledTextField text="Last Name"/>
                    </div>
                    <div>
                        <StyledTextField text="About" multiLine={true}/>
                    </div>
                    <div>
                        <StyledTextField text="Current Job Title"/>
                    </div>
                </div>
            </div>
        </StyledPaper>
    )
}