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
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Home from 'material-ui/svg-icons/action/home'
import EditPersonal from './EditPersonal'
import EditProfessional from './EditProfessional'
import EditEducation from './EditEducation'
import { style } from "./styles";

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
                <EditProfessional/>
            </div>
        )

    }
}

export default MainEditPage;
