import React, { Component } from 'react';

class Login extends Component {
    render() { 
        if (this.props.login) {
            return <div>已登录</div>
        } else {
            return <div>未登录</div>
        }
    }
}
 
export default Login;