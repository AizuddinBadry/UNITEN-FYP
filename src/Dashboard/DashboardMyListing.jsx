import React, {Component} from 'react';
import Header from './DashboardHeader'
import Sidebar from './DashboardSidebar'
import { Button, Form, Input, TextArea, Select } from 'semantic-ui-react'
import Modal from 'Core/Modal'
import axios from 'axios'


class DashboardMyListing extends Component{
constructor(props) {
    super(props);
    this.state = {user_id:'',listing:[],open: false, title:'',image:'',image2:'',image3:'',image4:'', description:'',price:'',
                  state:'',city:'',listing_id:'',review_list:[]}
  }

  componentDidMount() {
    var self = this;
     document.title = "My Listing";
     var token = localStorage.getItem('token');
     var listing_id = localStorage.getItem('listing_id')
     axios.post('http://localhost:3001/user/authenticate', {
          token: token
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({user_id: response.data['id']})
          axios.post('http://localhost:3001/services/list', {
            id: self.state.user_id
          })
          .then(function (response) {
            console.log(response.data);
            self.setState({listing:response.data})
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('http://localhost:3001/review/listing/' + listing_id)
          .then(function (response) {
            self.setState({review_list:response.data})
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  handleDelete = (e) =>
  {
    var self = this;
    var listing_id = e.target.value
     axios.post('http://localhost:3001/services/delete', {
          listing_id: listing_id,
          id: self.state.user_id
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({user_id: response.data['id']})
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleChange = (e) => {
      localStorage.setItem('listing_id', e.target.value)
      if((localStorage.getItem('listing_id')))
      {
        var listing_id = localStorage.getItem('listing_id')
        window.location = '/listing/'+listing_id
      }
      else
      {
        
      }
  }
  show = (dimmer,e) => () => this.setState({ dimmer, open: true, title:e.title, image:e.images , image2:e.images2, image3:e.images3, image4:e.images4, 
    description:e.description, price:e.price, state:e.state, city:e.city, listing_id:e.id, rate:e.rate
  })
  close = () => this.setState({ open: false })

render(){
  var self = this;
  const { open, dimmer , title, image, image2, image3, image4, description, price, state, city, listing_id, rate} = this.state
  const divStyle = {
  color: 'red',
  };
  const review_list = this.state.review_list.map(function(index){
    
  })
  const services_listing = this.state.listing.map(function(index){
    return(
       <li key={index.id}>
        <div className="list-box-listing">
          <div className="list-box-listing-img"><a onClick={self.handleDirect}><img src={index.images} alt="" width="100" height="190"/></a></div>
          <div className="list-box-listing-content">
            <div class="listing-titlebar">
              <div className="listing-titlebar-title">
              <input type="hidden" value={index.id}/>
                <h2>{index.title} <a className="listing-tag2">{index.category}</a></h2>
                <p><b>Price: </b>RM{index.price} / {index.rate}</p>
                <span>
                  <span className="listing-address">
                    <i className="fa fa-map-marker"></i>
                    {index.city},{index.state}
                  </span>
                </span>
                <div className="star-rating" data-rating="5">
                  <p><i style={divStyle} className="sl sl-icon-like"></i> 0 <i className="sl sl-icon-dislike"></i> 0</p>
                  <div className="rating-counter">
                    <span>({review_list.length} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons-to-right">
          <button className="button gray" value={index.id} name="view"  onClick={self.handleChange}><i className="sl sl-icon-magnifier"></i> View</button>
          <button className="button gray" value={index.id} name="edit"  onClick={self.show('blurring',index)}><i className="sl sl-icon-note"></i> Edit</button>
          <button className="button gray" value={index.id} onClick={self.handleDelete}><i className="sl sl-icon-close"></i> Delete</button>
        </div>
      </li>
      )
    })
  
  return(
    <div>
      <a href="dashboard.html#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> Dashboard Navigation</a>
        <div>
          <div className="row">
            <div className="col-md-12">
              <h2>My Listing</h2>
              <nav id="breadcrumbs">
                <ul>
                  <li><a href="dashboard-my-profile.html#">Home</a></li>
                  <li><a href="dashboard-my-profile.html#">Dashboard</a></li>
                  <li>My Listing</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="dashboard-list-box margin-top-0">
            <Modal 
            id={listing_id}
            title={title} 
            dimmer={dimmer} 
            open={open} 
            image={image} 
            image2={image2}
            image3={image3}
            image4={image4}
            description={description}
            price={price}
            state={state}
            city={city}
            rate={rate}
            close={this.close}/>
              <h4>Active Listings</h4>
              <ul>

               {services_listing}

              </ul>
            </div>
          </div>
        </div>
      </div>
          );
        }
    }

    export default DashboardMyListing;