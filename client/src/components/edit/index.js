import React, { Component } from 'react';
import {Experience} from "./Experience";
import './edit.css'
import {Personal} from './Personal'
import {Media} from "./Media";
import {style} from "../../widgets/styles";
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'


class EditProfile extends Component {
    render(){
        return(
            <div className="primaryDiv">
                <div className="header">
                    <div className="headerAvatar">
                        <Avatar icon={<Person/>} size={100} style={style.avatarIcon}/>
                    </div>
                </div>
                <div className="mainGrid">
                    <div className="personal">
                       <Personal/>
                    </div>
                    <div className="media">
                        <Media/>
                    </div>
                    <div className='experience'>
                        <Experience/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile;
