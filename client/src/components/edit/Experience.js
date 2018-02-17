import React from 'react';
import {StyledTextField} from "../../widgets/StyledTextField";
import {DatePicker,
        Paper,
        AppBar,
        IconButton
}
from 'material-ui'
import './experience.css'
import {style} from '../../widgets/styles'
import {AddButton} from "../../widgets/AddButton";
import Location from 'material-ui/svg-icons/communication/location-on'


export const Experience = (props) => {

    const { type } = props;
    const name = "Name of " + type;
    return (
        <Paper style={{display: 'inline-block', height: 'auto', width:'100%'}} zDepth={3}>
            <div className="boxGrid">
                <div className="left">
                    <AppBar
                        iconElementLeft={<IconButton><Location/></IconButton>}
                        title={<span style={style.title}>Experiences</span>}
                    />
                </div>
                <div className="right">
                    <div className="outerDiv">
                        <div>
                            <StyledTextField text={name}/>
                        </div>
                        <div>
                            <StyledTextField text="Position/Role"/>
                        </div>
                        <div>
                            <StyledTextField text="Awards Received" multiLine={true}/>
                        </div>
                        <div>
                            <DatePicker style={style.datePicker} hintText="Start Date" mode="landscape"/>
                        </div>
                        <div>
                            <DatePicker style={style.datePicker} hintText="End Date" mode="landscape"/>
                        </div>
                        <div>
                            <StyledTextField text="Address" multiLine={true}/>
                        </div>
                        <div>
                            <StyledTextField text="City"/>
                        </div>
                        <div>
                            <StyledTextField text="State"/>
                        </div>
                        <div>
                            <StyledTextField text="Postal Code"/>
                        </div>
                        <div>
                            <StyledTextField text="Country"/>
                        </div>
                        <div>
                            <AddButton label="Add Program"/>
                        </div>
                        <div>
                            <AddButton label="Add Experience"/>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )

}