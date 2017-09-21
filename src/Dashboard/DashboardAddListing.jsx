import React, {Component} from 'react';
import axios from 'axios'
import Select from 'react-select'
import { Dropdown, Button, Form} from 'semantic-ui-react'

class DashboardAddListing extends Component{
  constructor(props) {
    super(props);
    this.state = {user_id:'',title:'',category:'',price:'',state:'',address:'',city:'',zipcode:'',description:'',image:'',image2:'',image3:'',image4:'',phone:'',
                  website:'',email:'',working_hours:'',rate:''}
  }

  componentDidMount() {
    var self = this;
     document.title = "Add Listing";
     var token = localStorage.getItem('token');
     axios.post('http://localhost:3001/user/authenticate', {
          token: token
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({
            user_id:response.data['id'],
          })
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleListing = () =>{
    var token = localStorage.getItem('token');
    axios.post('http://localhost:3001/listing/new', {
          token:token,
          title:this.state.title,
          category:this.state.category,
          price:this.state.price,
          state:this.state.state,
          address:this.state.address,
          city:this.state.city,
          zipcode:this.state.zipcode,
          images:this.state.image,
          images2:this.state.image2,
          images3:this.state.image3,
          images4:this.state.image4,
          description:this.state.description,
          phone:this.state.phone,
          website:this.state.website,
          email:this.state.email,
          user_id:this.state.user_id,
          rate:this.state.rate
        })
        .then(function (response) {
          console.log(response.data);
          window.location = '/my_listing'
        })
        .catch(function (error) {
          console.log(error);
        });
  }

 handleChangeImage = (evt) => {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];

      reader.onload = function(upload) {
          self.setState({
          image: upload.target.result
      }, function() {
          console.log(self.state.image);
      });
      };
      reader.readAsDataURL(file);
  }
  handleChangeImage2 = (evt) => {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];

      reader.onload = function(upload) {
          self.setState({
          image2: upload.target.result
      }, function() {
          console.log(self.state.image2);
      });
      };
      reader.readAsDataURL(file);
  }
  handleChangeImage3 = (evt) => {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];

      reader.onload = function(upload) {
          self.setState({
          image3: upload.target.result
      }, function() {
          console.log(self.state.image3);
      });
      };
      reader.readAsDataURL(file);
  }
  handleChangeImage4 = (evt) => {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];

      reader.onload = function(upload) {
          self.setState({
          image4: upload.target.result
      }, function() {
          console.log(self.state.image4);
      });
      };
      reader.readAsDataURL(file);
  }

  handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
  handleLogChange = (val,e) => {
    this.setState({[e.name]: e.value})
  }


render(){
  const options = [
    { key: 'h', text: 'hours', value: 'hours' },
    { key: 'j', text: 'task', value: 'task' },
  ]
  var categories = [
  { value: 'Photography',  text:'Photography'},
  { value: 'Makeup', text:'Makeup'},
  { value: 'Writing', text:'Writing'},
  { value: 'Graphic Design', text:'Graphic Design'},
  { value: 'Cleaning',text:'Cleaning'},
  { value: 'Programming',text:'Programming'}
  ];
  var states = [
      { key: 'p', text: 'Penang', value: 'Penang' },
      { key: 'k', text: 'Kuala Lumpur', value: 'Kuala Lumpur' },
      { key: 'p', text: 'Perak', value: 'Perak' },
      { key: 's', text: 'Sarawak', value: 'Sarawak' },
      { key: 'j', text: 'Johor', value: 'Johor' },
      { key: 'se', text: 'Selangor', value: 'Selangor' },
      { key: 'k', text: 'Kedah', value: 'Kedah' },
      { key: 'ke', text: 'Kelantan', value: 'Kelantan' },
      { key: 't', text: 'Terengganu', value: 'Terengganu' },
  ];
  return(
    <div>
      <a href="dashboard.html#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> Dashboard Navigation</a>
        <div>
          <div className="row">
            <div className="col-md-12">
              <h2>Add Listing</h2>
              <nav id="breadcrumbs">
                <ul>
                  <li><a href="dashboard-my-profile.html#">Home</a></li>
                  <li><a href="dashboard-my-profile.html#">Dashboard</a></li>
                  <li>Add Listing</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col-lg-12">

              <div id="add-listing">
                <div className="add-listing-section">

                  <div className="add-listing-headline">
                    <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                  </div>
                  <Form size='small'>
                  <div className="row with-forms">
                    <div className="col-md-12">
                      <h5>Listing Title <i className="tip" data-tip-content="Name of your services"></i></h5>
                      <input name="title" className="search-field" type="text" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                  </div>

                  <div className="row with-forms">
                    <div className="col-md-12">
                      <h5>Hobby Category</h5>
                      <Form.Select name='category' options={categories} value={this.state.category} placeholder='Choose Category' onChange={this.handleLogChange}/>
                    </div>
                  </div>

                  <br/>

                  <div className="row with-forms">
                    <div className="col-md-6">
                      <h5>Price <i className="tip" data-tip-content="eg: 300"></i></h5>
                      <input className="search-field" type="text" name="price" value={this.state.price} onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-6">
                      <h5>Rate <i className="tip" data-tip-content="eg: per hour"></i></h5>
                      <Form.Select name='rate' options={options} value={this.state.rate} placeholder='Choose rate' onChange={this.handleLogChange} />         
                    </div>
                  </div>
                  </Form>
                </div>

                <div className="add-listing-section margin-top-45">

                  <div className="add-listing-headline">
                    <h3><i className="sl sl-icon-location"></i> Location</h3>
                  </div>

                  <div className="submit-section">

                    <div className="row with-forms">
                    <Form size='small'>
                      <div className="col-md-6">
                        <h5>State</h5>
                        <Form.Select name='state' options={states} value={this.state.state} placeholder='Select states' onChange={this.handleLogChange}/>    
                      </div>

                      <div className="col-md-6">
                        <h5>Address</h5>
                        <input type="text" placeholder="e.g. 964 School Street" name="address" onChange={this.handleChange} value={this.state.address}/>
                      </div>

                      <div className="col-md-6">
                        <h5>City</h5>
                        <input type="text" name="city" onChange={this.handleChange} value={this.state.city}/>
                      </div>

                      <div className="col-md-6">
                        <h5>Zip Code</h5>
                        <input type="text" name="zipcode" onChange={this.handleChange} value={this.state.zipcode}/>
                      </div>
                      </Form>

                    </div>

                  </div>
                </div>

                <div className="add-listing-section margin-top-45">

                  <div className="add-listing-headline">
                    <h3><i className="sl sl-icon-picture"></i> Listings Images</h3>
                  </div>

                  <div className="row">
                  <br/><br/><br/>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={this.state.image} alt="" width="100" height="200"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Upload Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                   <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={this.state.image2} alt="" width="100" height="200"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Upload Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage2}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={this.state.image3} alt="" width="100" height="200"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Upload Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage3}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={this.state.image4} alt="" width="100" height="200"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Upload Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage4}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="add-listing-section margin-top-45">

                  <div className="add-listing-headline">
                    <h3><i className="sl sl-icon-docs"></i> Details</h3>
                  </div>

                  <div className="form">
                    <h5>Description</h5>
                    <textarea name="description" className="WYSIWYG" cols="40" rows="3" id="summary" spellcheck="true" onChange={this.handleChange} value={this.state.description}></textarea>
                  </div>

                  <div className="row with-forms">
                  <Form size='small'>
                    <div className="col-md-4">
                      <h5>Phone <span>(optional)</span></h5>
                      <input name="phone" type="text" onChange={this.handleChange} value={this.state.phone}/>
                    </div>

                    <div className="col-md-4">
                      <h5>Website <span>(optional)</span></h5>
                      <input name="website" type="text" onChange={this.handleChange} value={this.state.website}/>
                    </div>

                    <div className="col-md-4">
                      <h5>E-mail <span>(optional)</span></h5>
                      <input name="email" type="text" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                  </Form>
                  </div>
                </div><br/>
                <center>
                <Button  as='button' color='red' onClick={this.handleListing}>Save</Button></center>
            </div>

            <div className="col-md-12">
              <div className="copyrights"></div>
            </div>

          </div>
        </div>
      </div>
          );
        }
    }

    export default DashboardAddListing;