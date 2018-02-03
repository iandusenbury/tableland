import  getMuiTheme  from 'material-ui/styles/getMuiTheme'
import {grey400, grey500} from "material-ui/styles/colors";

import {deepOrange500, orange500} from "material-ui/styles/colors";

export const muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange500,
        accent1Color: deepOrange500
    }
});



export const style = {
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
    },

    addButton: {
        marginTop: '5%',
        marginLeft: '3%'
    }
};

