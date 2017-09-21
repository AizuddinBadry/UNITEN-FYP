import React, {Component} from 'react';
import Header from './DashboardHeader';
import Sidebar from './DashboardSidebar';
import { Button, Form, Input, TextArea, Select, Modal, Icon, Segment } from 'semantic-ui-react';
import axios from 'axios';


class DashboardMyTask extends Component{
constructor(props) {
    super(props);
    this.state = {user_id:'',listing:[],open: false,open2: false, title:'',image:'',image2:'',image3:'',image4:'', description:'',price:'',
                  state:'',city:'',listing_id:'',report_description:''}
  }

  componentDidMount() {
    var self = this;
     document.title = "My Task";
     var token = localStorage.getItem('token');
     axios.post('http://localhost:3001/user/authenticate', {
          token: token
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({user_id: response.data['id']})
            axios.post('http://localhost:3001/services/task', {
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
    var self = this;
    self.setState({[e.target.name]: e.target.value})
  }

  submitStatus = (e) => {
     var self = this;
     axios.post('http://localhost:3001/task/status/' + e.target.value, {
          type: e.target.value,
          status: e.target.value,
          listing_id: self.state.listing_id,
          description: self.state.report_description,
          [e.target.name]:e.target.name
        })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  show = dimmer => (e) => {
    this.setState({ dimmer, open: true, listing_id:e.target.value  })
  }
  show2 = dimmer => (e) =>{
    this.setState({ dimmer, open2: true, listing_id:e.target.value })
  } 
  close = () => this.setState({ open: false })
  close2 = () => this.setState({ open2: false })


render(){
  var self = this;
  const { open, open2, dimmer , title, image, image2, image3, image4, description, price, state, city, listing_id, rate, report_description} = this.state
  const divStyle = {
  color: 'red',
  };

  const services_listing = this.state.listing.map(function(index){
    const status = (bool) =>{
      if(index.status_by_hobbez)
      {
        if(index.status_by_customer === null)
        {
          return 'Waiting for customer'
        }
        else
        {
          return 'Completed'
        }
      } else {
        return <div><Button value={index.id} name='provider' color='teal' onClick={self.submitStatus}>Delivered</Button><Button value={index.id} color='red' onClick={self.show2('blurring')}>Not Delivered</Button></div>
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
        
        <Modal size='tiny' dimmer={dimmer} open={open2} onClose={self.close2}>
          <Modal.Header><center>Report</center></Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <center>
              <Form.TextArea name='report_description' value={report_description} placeholder='Tell us more about this task...' onChange={self.handleChange}/>
              </center>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
          <center>
            <Button color='green' value='false' onClick={self.submitStatus}>Submit</Button>
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
              <h2>My Task</h2>
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

    export default DashboardMyTask;