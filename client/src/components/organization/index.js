import React from 'react'
import {
  Card,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
  SelectField,
  TextField
} from 'material-ui'
/*
import { StyledTextField } from '../../widgets/StyledTextField'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { SaveButton } from '../../widgets/SaveButton'
*/

export default () => (
    <div className="fieldsWrapper">
      <div>
        <Card>
          <CardHeader
            id="org_name"
            title="Organization Name"
            subtitle="we can put a subtitle here, maybe address?"
            avatar=""
          />
          <CardMedia
            overlay={
              <CardTitle 
                title="Organization name here?" 
                subtitle="optional subtitle" 
              />
            }
          />
          <CardText id="description">
            Description goes here
          </CardText>
          <div className="photo here">
          </div>
          <div>
            <TextField floatingLabelText="Organization Name" id="org_name" />
          </div>
          <div>
            <TextField floatingLabelText="Description" id="description" multiLine={true} />
          </div>
          <div>
            <TextField floatingLabelText="URL" id="org_url" />
          </div>
          <div>
            <TextField floatingLabelText="Address" id="org_address_line_1" />
          </div>
          <div>
            <TextField floatingLabelText="City" id="org_cityy" />
          </div>
          <div>
            <TextField floatingLabelText="State" id="org_state" />
          </div>
          <div>
            <TextField floatingLabelText="Postal Code" id="org_zip" />
          </div>
          <div>
            <TextField floatingLabelText="Country" id="org_country" />
          </div>
        </Card>
      </div>
    </div>
)
