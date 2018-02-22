import React from 'react'
import Paper from 'material-ui/Paper'
import {style} from './styles'

export const StyledPaper = (props) => {

    const {children} = props

    return (
        <Paper style={style.paper} zDepth={3}>
            {children}
        </Paper>
    )
}