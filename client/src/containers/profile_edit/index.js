import React, { Component } from 'react'
import  Input from 'react-toolbox/lib/input/Input'
import Avatar from 'react-toolbox/lib/avatar/Avatar'
import './profile_edit.css'
import logo from './abstract_tree.svg'


class ProfileEdit extends Component {

    state = { name: '', email: '', position: ''};

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value}); //changing the value of the member that was passed in, into the passed
                                                        //in value
    };

    render() {

        return (
            <div className="outerLayout">
                <div className="layoutOfAvatar">
                    <Avatar icon={logo} />
                </div>
                <div className="layoutOfDiv">
                    <div className="nameInput">
                        <Input type='text' label='Full Name' name='name' value={this.state.name}
                          required onChange={this.handleChange.bind(this, 'name')} />
                    </div>
                    <div className="emailInput">
                        <Input type='text' label='Email address' value={this.state.email}
                            onChange={this.handleChange.bind(this,'email')} />
                    </div>
                    <div className="emailInput">
                        <Input type="text" label='Current Position' value={this.state.position}
                            onChange={this.handleChange.bind(this, 'position')} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEdit;