/* This file is the main edit page, which is
* the page that users will see as soon as they click the
* edit page from the menu*/
import React from 'react'
import { Component } from 'react'
import Paper from 'material-ui/Paper'
import './main.css'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Person from 'material-ui/svg-icons/social/person'
import Divider from 'material-ui/Divider'
import School from 'material-ui/svg-icons/social/school'
import Professional from 'material-ui/svg-icons/action/work'
import {grey500} from 'material-ui/styles/colors'
import {grey400} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Save from 'material-ui/svg-icons/content/save'
import Home from 'material-ui/svg-icons/action/home'
import SelectField from 'material-ui/SelectField'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'

/*const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '3%',
        marginBottom: '3%',
        height: '75vh',
        width: 168
    },

    divider: {
        width: 168
    },

    textHint: {
        color: orange100
    },

    textFieldUnderline: {
        borderColor: grey400
    },

    textFloating: {
        color: orange100
    }

}

class MainEditPage extends Component {

    render() {
        return(
            <div className='mainDiv'>
                <Paper style={style.paper} zDepth={3}>
                    <Menu>
                        <MenuItem primaryText='Personal' rightIcon={<Person/>}/>
                        <Divider style={style.divider}/>
                        <MenuItem primaryText='Education' rightIcon={<School/>}/>
                        <Divider style={style.divider}/>
                        <MenuItem primaryText='Professional' rightIcon={<Professional/>}/>
                    </Menu>
                </Paper>
                <div className='grid'>
                </div>
            </div>
        )
    }


}*/


const style = {
    paper: {
        display: 'inline-block',
        color: grey400,
        float: 'left',
        marginLeft: '1%',
        marginRight: '1%',
        //marginTop: '3%',
        //marginBottom: '3%',
        height: '80vh',
        width: 224
    },

    divider: {
        width: 224
    },

    menu: {
        //marginTop: '20%'
    },

    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },

    textHint: {
        color: grey500
    },

    textFieldUnderline: {
        borderColor: grey400
    },

    textFloating: {
        color: grey500
    },

    title: {
        cursor: 'pointer'
    },


    //not sure if this is actually doing anything
    avatarIcon: {
        marginBottom: '70%'
    },

    button: {
        marginTop: '5%'
    },

    buttonStyle: {
        height: '40px',
    }
};

class MainEditPage extends Component {
    render() {
        return(
            <div className='menuWrapper'>
                <div>
                    <Paper style={style.paper} zDepth={3}>
                        <AppBar iconElementLeft={<IconButton><Home/></IconButton>} title={<span style={style.title}>Menu</span>}/>
                        <Menu style={style.menu}>
                            <MenuItem primaryText='Personal' rightIcon={<Person className={style.rightIcon}/>}/>
                            <Divider style={style.divider}/>
                            <MenuItem primaryText='Education' rightIcon={<School className={style.rightIcon}/>}/>
                            <Divider style={style.divider}/>
                            <MenuItem primaryText='Professional' rightIcon={<Professional className={style.rightIcon}/>}/>
                        </Menu>
                    </Paper>
                </div>
                <div className='fieldsWrapper'>
                    <div className='avatar'>
                        <Avatar icon={<Person/>} size={120} style={style.avatarIcon}/>
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Job Title'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='First Name'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='LinkedIn User ID'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Last Name'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <SelectField
                            floatingLabelText='STEM Field'
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            hintStyle={style.textHint}
                            menuItemStyle={style.textHint}
                            value={null}
                        >
                            <MenuItem primaryText='Science'/>
                            <MenuItem primaryText='Technology'/>
                            <MenuItem primaryText='Engineering'/>
                            <MenuItem primaryText='Mathematics'/>
                        </SelectField>
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Email'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <SelectField
                            floatingLabelText='Private Profile?'
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            hintStyle={style.textHint}
                            menuItemStyle={style.textHint}
                            value={null}
                        >
                            <MenuItem primaryText='Yes'/>
                            <MenuItem primaryText='No'/>
                        </SelectField>
                    </div>
                    <div>
                        <TextField
                            underlineStyle={style.textFieldUnderline}
                            floatingLabelStyle={style.textFloating}
                            floatingLabelFocusStyle={style.textFloating}
                            floatingLabelText='Phone (Optional)'
                            hintStyle={style.textHint}
                        />
                    </div>
                    <div>
                        <RaisedButton label='Save & Done' primary={true} icon={<Save/>}
                                      labelPosition='before'
                                      style={style.button}
                                      buttonStyle={style.buttonStyle}
                        />
                    </div>
                </div>
            </div>
        )




    }
}

export default MainEditPage;
