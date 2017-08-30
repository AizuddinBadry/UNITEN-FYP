import React, {Component} from 'react';
import axios from 'axios'

class DashboardSidebar extends Component{

  constructor(props) {
    super(props);
    this.state = {token:''}
  }
  componentDidMount() {
    var token = localStorage.getItem('token');
    this.setState({token:token})
    if(!token)
     {
      window.location = '/'
     }
     else
     {
      
     }
  }


  handleLogout = () => {
    var self = this;
     axios.post('http://localhost:3001/user/logout', {
          token: this.state.token
        })
        .then(function (response) {
          localStorage.removeItem('token');
          window.location = "/"
        })
        .catch(function (error) {
          console.log(error);
        });
  }
render(){
  return(
    <div className="dashboard-nav">
        <div className="dashboard-nav-inner">

          <ul data-submenu-title="Main">
            <li><a href="/dashboard"><i className="sl sl-icon-user"></i> My Profile</a></li>
          </ul>
          
          <ul data-submenu-title="Listings">
            <li><a href="/my_listing"><i className="sl sl-icon-layers"></i> My Listings</a></li>
            <li><a href="/my_orders"><i className="sl sl-icon-list"></i> My Orders</a></li>
            <li><a href="/my_bookmarks"><i className="sl sl-icon-heart"></i> Bookmarks</a></li>
            <li><a href="/add_listing"><i className="sl sl-icon-plus"></i> Add Listing</a></li>
          </ul> 

          <ul data-submenu-title="Account">
            <li><a href="/my_reviews"><i className="sl sl-icon-star"></i> Rewards</a></li>
            <li><a href="/my_reviews"><i className="sl sl-icon-briefcase"></i> Earning</a></li>
            <li><a  onClick={this.handleLogout}><i className="sl sl-icon-power"></i> Logout</a></li>
          </ul>
          
        </div>
      </div>
          );
        }
    }

    export default DashboardSidebar;