import React, { Component } from 'react';
import Input from './common/input';


class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: '' 
        },
        errors: {}
    }

    username = React.createRef()

    validate = () => {
        const errors = {}

        if (this.state.account.username.trim() === '') {
            errors.username = 'Username is required.'
        }
        if (this.state.account.password.trim() === '') {
            errors.password = 'Password is required.'
        }

        return Object.keys(errors).length === 0 ? null : errors
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate()
        this.setState({ errors: errors || {} })
        if (errors) return

        // Call the server
        console.log("Submitted")
    }

    validateProperty = input => {
        if (input.name === "username") {
            if (input.value.trim() === '') return 'Username is required.'
        }
        if (input.name === "password") {
            if (input.value.trim() === '') return 'Password is required.'
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const account = {...this.state.account}
        account[input.name] = input.value

        this.setState({ account, errors })
    }
    
    render() { 
        const { account } = this.state

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username" value={account.username} label="Username" onChange={this.handleChange} error={this.state.errors.username} />
                    <Input name="password" value={account.password} label="Password" onChange={this.handleChange} error={this.state.errors.password} />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;