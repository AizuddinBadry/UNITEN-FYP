import React from 'react'
import axios from 'axios'
import { Button, Modal, Form, Input, TextArea, Select } from 'semantic-ui-react'

class ServicesModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open:this.props.open, title:'', description:'', price:'', rate:'', state:'', city:'', image:'', image2:'', image3:'', image4:''}
	}

	componentWillReceiveProps(props){
    this.setState({title: props.title, description: props.description, price:props.price, rate:props.rate, state:props.state, city:props.city, image:props.image, image2:props.image2, image3:props.image3, image4:props.image4})
  	}

	handleSubmit = (e) =>{
	var self = this;
	const {title, image, image2, image3, image4, description, price, state, city,rate} = this.state;
    var listing_id = e.target.value
     axios.post('http://localhost:3001/listing/update', {
          id: listing_id,
          title:title,
          description:description,
          price:price,
          state:state,
          city:city,
          rate:rate,
          images:image,
          images2:image2,
          images3:image3,
          images4:image4,
        })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        });
	}

	handleChange = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}
  handleLogChange = (val,e) =>{
    this.setState({[e.name]:e.value})
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

	close = () => this.setState({ open: false })

	render(){
		var self = this;
		const options = [
		  { key: 'd', text: 'hours', value: 'hours' },
		  { key: 'j', text: 'task', value: 'task' },
		]
		const states = [
		  { key: 'p', text: 'Penang', value: 'Penang' },
		  { key: 'k', text: 'Kuala Lumpur', value: 'Kuala Lumpur' },
		  { key: 'p', text: 'Perak', value: 'Perak' },
		  { key: 's', text: 'Sarawak', value: 'Sarawak' },
		  { key: 'j', text: 'Johor', value: 'Johor' },
		  { key: 'se', text: 'Selangor', value: 'Selangor' },
		  { key: 'k', text: 'Kedah', value: 'Kedah' },
		  { key: 'ke', text: 'Kelantan', value: 'Kelantan' },
		  { key: 't', text: 'Terengganu', value: 'Terengganu' },
		]
		const {dimmer, open, close, id} = this.props
		const {title, image, image2, image3, image4, description, price, state, city, rate} = this.state;
		return(
		 <Modal dimmer={dimmer} open={open} onClose={close}>
            <Modal.Header>
              Edit Listing
            </Modal.Header>
            <Modal.Content>
           	<div className="row">
                  <br/><br/><br/>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={image} alt="" width="50" height="150"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Change Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                   <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={image2} alt="" width="50" height="150"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Change Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage2}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={image3} alt="" width="50" height="150"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Change Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage3}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="submit-section">
                        <div className="edit-profile-photo">
                        <img src={image4} alt="" width="50" height="150"/>
                        <div className="change-photo-btn">
                          <div className="photoUpload">
                              <span><i className="fa fa-upload"></i> Change Photo</span>
                              <input type="file" className="upload" onChange={this.handleChangeImage4}/>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <Form>
	               <Form.Field inline>
					      <label>Title</label>
					      <Input value={title} name='title' onChange={this.handleChange} />
					  </Form.Field>
					  <Form.Field inline>
					      <label>Description</label>
					      <TextArea value={description} name='description' onChange={this.handleChange}/>
					  </Form.Field>
					  <Form.Field inline>
					      <label>Price</label>
					      <Input value={price} name='price' onChange={this.handleChange}/>
					      <label>/</label>
					      <Select options={options} placeholder='Price rate' name='rate' value={rate} onChange={this.handleLogChange}/>
					  </Form.Field>
					  <Form.Field inline>
					      <label>State</label>
					      <Select options={states} placeholder='State' value={state} name='state' onChange={this.handleLogChange}/>
					  </Form.Field>
					  <Form.Field inline>
					      <label>City</label>
					      <Input placeholder='City' value={city} name='city' onChange={this.handleChange}/>
					  </Form.Field>
				  </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button positive value={id} icon='checkmark' labelPosition='right' content='Save' onClick={this.handleSubmit}/>
            </Modal.Actions>
          </Modal>
			)
		}
	}

export default ServicesModal;