import React, {Component} from 'react';
import Header from './DashboardHeader';
import Sidebar from './DashboardSidebar';
import { Button, Form, Input, TextArea, Select, Modal, Icon, Segment } from 'semantic-ui-react';
import axios from 'axios';


class DashboardMyListing extends Component{
constructor(props) {
    super(props);
    this.state = {user_id:'',listing:[],open: false,open2: false, title:'',image:'',image2:'',image3:'',image4:'', description:'',price:'',
                  state:'',city:'',listing_id:''}
  }

  componentDidMount() {
    var self = this;
     document.title = "My Orders";
     var token = localStorage.getItem('token');
     axios.post('http://localhost:3001/user/authenticate', {
          token: token
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({user_id: response.data['id']})
            axios.post('http://localhost:3001/services/orders', {
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
  show = dimmer => () => this.setState({ dimmer, open: true })
  show2 = dimmer => () => this.setState({ dimmer, open2: true })
  close = () => this.setState({ open: false })
  close2 = () => this.setState({ open2: false })


render(){
  var self = this;
  const { open, open2, dimmer , title, image, image2, image3, image4, description, price, state, city, listing_id,rate} = this.state
  const divStyle = {
  color: 'red',
  };
  const services_listing = this.state.listing.map(function(index){

    const status = (bool) =>{
      if(index.status_by_hobbez)
      {
        if(index.status_by_customer === null)
        {
          return <div><Button color='teal' onClick={self.show('blurring')}>Delivered</Button><Button color='red' onClick={self.show2('blurring')}>Not Delivered</Button></div>
        }
        else
        {
          return 'Completed'
        }
      } else {
        return 'Waiting for provider'
      }
    }

    return(
       <li key={index.id}>
        <div className="list-box-listing">
          <div className="list-box-listing-img"><a onClick={self.handleDirect}><img src={index.images} alt="" width="100" height="190"/></a></div>
          <div className="list-box-listing-content">
            <div class="listing-titlebar">
              <div className="listing-titlebar-title">
              <input type="hidden" value={index.id}/>
                <h2>{index.title} <a className="listing-tag2">{index.category}</a></h2>
                <p><b>Description: </b></p>
                <p><b>{index.description} </b></p>
                <span>
                  <span className="listing-address">
                    Status: {index.status_by_hobbez ? index.status_by_customer : 'Pending'}
                  </span>
                </span>
                <div className="star-rating" data-rating="5">
                  <p><i style={divStyle} className="sl sl-icon-like"></i> 0 <i className="sl sl-icon-dislike"></i> 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons-to-right">
          {status(index.status_by_hobbez)}
        </div>
          <Modal size='tiny' dimmer={dimmer} open={open} onClose={self.close}>
          <Modal.Header><center>Rate</center></Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <center>
              <Button size='massive' circular color='green' icon='like outline' value='true' name='upvote' onClick={self.submitStatus}/>
              <Button size='massive' circular color='red' icon='dislike outline' value='true' name='downvote' onClick={self.submitStatus}/>
              </center>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Modal size='tiny' dimmer={dimmer} open={open2} onClose={self.close2}>
          <Modal.Header><center>Report</center></Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <center>
              <Form.TextArea placeholder='Tell us more about this task...' />
              </center>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
          <center>
            <Button color='green'>Submit</Button>
          </center>
          </Modal.Actions>
        </Modal>
      </li>
      )
    })
  
  return(
    <div>
      <a href="dashboard.html#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> Dashboard Navigation</a>
        <div>
          <div className="row">
            <div className="col-md-12">
              <h2>My Orders</h2>
              <nav id="breadcrumbs">
               
              </nav>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="dashboard-list-box margin-top-0">
              <h4>Order History</h4>
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