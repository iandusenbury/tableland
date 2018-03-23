import React, {Component} from 'react'
import { AppBar, IconButton } from 'material-ui'
import { Field, reduxForm } from 'redux-form'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import './editOrg.css'


class MediaInfo extends Component {
    componentDidMount(){
        this.props.initialize({...this.props})
    }

    render() {
        const {handleSubmit} = this.props
        return (
            <StyledPaper>
                <div className="orgSectionGrid">
                    <div>
                        <AppBar
                            iconElementLeft={
                                <IconButton>
                                    <Photo/>
                                </IconButton>
                            }
                            iconStyleLeft={style.appBar}
                            title={<span style={style.title}>Media</span>}
                            style={style.organizationAppBar}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="orgMediaGrid">
                            <div>
                                <Field
                                    name="organizationVideo"
                                    component={StyledTextField}
                                    text="Video URL"
                                    multiLine
                                    org
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </StyledPaper>
        )
    }
}
export default reduxForm({
    form: 'mediaInfo',
    enableReinitialize: true
})(MediaInfo)