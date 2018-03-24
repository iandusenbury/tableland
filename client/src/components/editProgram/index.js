import React, { Component } from 'react'
import { find, propEq } from 'ramda'
import { orange400 } from 'material-ui/styles/colors'
import { RaisedButton } from 'material-ui'

import '../editOrganization/editOrg.css'
import NotFound from '../notFound'
import About from '../../containers/editProgram/aboutProgram'
import Media from '../../containers/editProgram/mediaProgram'

function clickFunction(submit) {
    submit('aboutProgram')
    submit('mediaInfo')
    window.location.reload(true)
}

class EditProgram extends Component {
   componentWillMount() {
        const {
            fetchProgram,
            fetchUserPermissions,
            match,
            userId
        } = this.props

        fetchProgram(match.params.id)
        fetchUserPermissions(userId)
    }

    render() {
      const {
            id,
            submit,
            videoID,
            permissions,
            updateProgram,
            updateProgramVideo
        } = this.props

        const progIds = permissions.map(perm => {
            const { id: permId } = perm

            return permId
        })

        const found = find(propEq('id', id))(permissions)

        const permissionDenied = found === undefined && progIds.length > 0

        const saveProgramInfo = values => {
          const { name, description, url} = values
          const info = {
              name,
              description,
              url
          }

          updateProgram(id, info)
        }

        const saveProgramVideo = values => {
          const { organizationVideo } = values
          updateProgramVideo(organizationVideo, id, videoID)
        }

        const toRender = () => {
            if (permissionDenied) {
                return <NotFound />
            }

            return (
                <div className="orgPrimaryDiv">
                    <div className="orgHeader">
                        <div className="orgHeaderAvatar" />
                    </div>
                    <div className="orgMainGrid">
                        <div className="orgPersonal">
                            <About onSubmit={saveProgramInfo}/>
                        </div>
                        <div className="orgMedia">
                           <Media onSubmit={saveProgramVideo}/>
                        </div>
                    </div>
                    <div style={{ margin: '.5%' }}>
                        <RaisedButton
                            label="Save"
                            labelColor="#FFF"
                            fullWidth
                            buttonStyle={{ backgroundColor: orange400 }}
                            onClick={() => clickFunction(submit)}
                        />
                    </div>
                </div>
            )
        }

        return toRender()
    }
}

export default EditProgram;
