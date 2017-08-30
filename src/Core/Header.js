import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import logo from 'Assets/images/logo.png'
import { Button, Segment } from 'semantic-ui-react'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state= {loggedin:'',name:'',login:'',start:''}
  }
  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token');
     axios.post('http://localhost:3001/user/authenticate', {
          token: token
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data === false)
          {
            self.setState({loggedin:false})
          }
          else
          {
            self.setState({loggedin:true,name:response.data['name']})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleSubmit = (e) =>{
    if([e.target.name] == 'login')
    {
      window.location = '/login'
    }
    else if([e.target.name] == 'start')
    {
      window.location = '/registration'
    }
    else if([e.target.name] == 'dashboard')
    {
      window.location = '/dashboard'
    }
  }
  render() {
    return (
      <header id="header-container">
      <div id="header">
        <div className="container">
          <div className="left-side">
            <div id="logo">
              <a href="/"><img src={logo} alt=""/></a>
            </div>   
          </div>
          <div className="right-side">
            <div className="header-widget" >   
              {this.state.loggedin ? '': <Button name='login' color='blue' content='Login' onClick={this.handleSubmit}/>}
              {this.state.loggedin ?  <Button name='dashboard' color='youtube' icon='play' content='Dashboard' onClick={this.handleSubmit}/> : <Button name='start' inverted color='red' icon='play' onClick={this.handleSubmit}>Start Listing</Button>}
            </div>
          </div>
        </div>
      </div>
      </header>
    );
  }
}

export default Header;
