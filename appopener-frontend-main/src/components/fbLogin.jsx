// FacebookLoginButton.jsx
import React, { Component, props } from 'react';
import FacebookLogin from 'react-facebook-login';
import classes from "./Styles.module.css";

class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = { userExist: false };
  }

  handleLoginSuccess = (res) => {
    this.props.sendData(res);
    console.log('Login successful:', res);
    console.log('email', res.email);
    
    localStorage.setItem("fb_mail",res.email);
    // Add your logic to handle successful login
  };

  handleLoginFailure = (res) => {
    console.log('Login failed:', res);
    // Add your logic to handle login failure
  };
  

  render() {
    return (
      <><head>
          <meta name="description" content="My Description" />
      </head>


      
      <div style={{ display: "block", height: "38px"}}>
          <FacebookLogin
            appId="1039489120434206"
            autoLoad={false}
            cookie= {true}
            cssClass = {classes.fbLoginBtn }
            fields="name,email,picture"
            callback={this.handleLoginSuccess}
            onFailure={this.handleLoginFailure}
            icon="fa-facebook"
            scope='public_profile,email'
            returnScopes = {true}
            textButton="" />
            
        </div></>
    );
  }
}

export default FacebookLoginButton;
