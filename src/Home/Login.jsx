import React, {Component} from 'react';
import axios from 'axios'

class Login extends Component{
  constructor(props) {
      super(props);
      this.state = {name: '', phone: '', email: '', password:''};
      this.onEmail = this.onEmail.bind(this);
      this.onPassword = this.onPassword.bind(this);
      this.onLogin = this.onLogin.bind(this);
  }

  onEmail(event){
    var self = this;
    self.setState({email:event.target.value})
  }
  onPassword(event){
    var self = this;
    self.setState({password:event.target.value})
  }

  onLogin(){
    var self = this;
    var email = self.state.email;
    var password = self.state.password;

    axios.post('http://localhost:3001/user/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data['status'] === "true")
        {
          localStorage.setItem("token", response.data['token']);
          window.location = '/listing'
        }
        else if(response.data === false)
        {
          alert('Wrong username or password!')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

render(){
  return(
    <div>
        <div className="wrapper">
          <center>
            <div className="container">
              <h1>Welcome</h1>
              <div className="main-search-input gray-style margin-top-50 margin-bottom-10">
                <div className="main-search-input-item">
                  <input type="text" placeholder="Email" value={this.state.email} onChange={this.onEmail}/>
                </div>
              </div>
              <div className="main-search-input gray-style margin-top-50 margin-bottom-10">
                <div className="main-search-input-item">
                <input type="password" placeholder="password" value={this.state.password} onChange={this.onPassword}/>
              </div>
              </div>
                <p><button type="submit" className="button" onClick={this.onLogin}>Login</button></p>
            </div>
          </center>
        </div>
      </div>
          );
        }
    }

    export default Login;