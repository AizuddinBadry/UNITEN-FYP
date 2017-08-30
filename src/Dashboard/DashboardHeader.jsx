import React, {Component} from 'react';
import logo from 'images/logo.png'
import { Button } from 'semantic-ui-react'

class DashboardHeader extends Component{
render(){
  return(
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
             <a href="/listing"><Button  as='button' color='blue'>View Listing</Button></a>
              <a href="/add_listing"><Button  as='button' color='red'>Add Listing</Button></a>
            </div>
          </div>
        </div>
      </div>
      </header>
          );
        }
    }

    export default DashboardHeader;