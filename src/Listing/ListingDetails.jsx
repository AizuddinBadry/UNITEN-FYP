import React from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import Review from './Review'
import WaitingPayment from './WaitingPayment'
import { Button, Form, Input, TextArea, Select, Modal, Icon, Segment, Header } from 'semantic-ui-react'
import NoImages from 'Assets/images/no_image.gif'

class ListingDetails extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {listing: [], user:[], open:false, load:false, loggedin:'', name:'', images:'', open_modal:false, bill_id:'', customer_number:'',
						customer_id:'', description:'', duration:'', title:'', email:''};
	  }

	componentDidMount() {
	var self = this;
     axios.get('http://localhost:3001/listing/view/'+ localStorage.getItem('listing_id'))
        .then(function (response) {
          console.log(response.data);
          self.setState({
          	listing: response.data['listing'], 
          	user: response.data['user'], 
          })
        })
        .catch(function (error) {
          console.log(error);
        });

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
            self.setState({
            	loggedin:true,
            	name:response.data['name'],
            	email:response.data['email'],
            	customer_number:response.data['phone'],
            	customer_id:response.data['id']
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
	}

	handlePayment = () =>{
		var self = this;
		axios.post('http://localhost:3001/listing/order/create',{
			title:self.state.listing['title'],
			images:self.state.listing['images'],
			category:self.state.listing['category'],
			customer_id:self.state.customer_id,
			hobbez_id:self.state.user['id'],
			description:self.state.description,
			duration:self.state.duration,
			duration_type:self.state.listing['rate']
		})
	        .then(function (response) {
	        	self.setState({bill_id:response.data['id']})
	          window.open(response.data['url'], '_blank');
	        })
	        .catch(function (error) {
	          console.log(error);
	    });

		self.setState({open:false, open_modal:true})
		axios.post('http://localhost:3001/transaction/payment',{
			name:self.state.name,
			email:self.state.email,
			amount:self.state.listing['price']
		})
	        .then(function (response) {
	        	self.setState({bill_id:response.data['id']})
	          window.open(response.data['url'], '_blank');
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
	}

	handleRedirect = (e) =>{
		if(e.target.name === 'register')
		{
			window.location = '/registration'
		}
		else
		{
			window.location = '/login'
		}
	}

	handleChanges = (e) =>{
		this.setState({description:e.target.value})
	}

	handleLogChanges = (val,e) =>{
		this.setState({[e.name]:e.value})
	}

	show = dimmer => () => this.setState({ dimmer, open: true })
  	close = () => this.setState({ open: false })
	render(){
		const { open, dimmer, load, name, email, amount, open_modal, bill_id, description, duration} = this.state
		const options = [
			  { key: 'i', text: 'Immediately', value: 'immediately' },
			  { key: '1', text: 'in 1 days', value: '1' },
			  { key: '2', text: 'in 2 days', value: '2' },
			  { key: '3', text: 'in 3 days', value: '3' },
			  { key: '4', text: 'in 4 days', value: '4' },
			  { key: '5', text: 'in 5 days', value: '5' },
			]
		const settings = {
	      dots: true,
	      dotsClass: 'slick-dots slick-thumb',
	      infinite: true,
	      speed: 100,
	      arrows: false,
	      slidesToShow: 4,
	      slidesToScroll: 1
	    };
		return(
			<div>
				 <Slider {...settings}>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images'] ? this.state.listing['images'] : NoImages}  height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images2'] ? this.state.listing['images2'] : NoImages} height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images3'] ? this.state.listing['images3'] : NoImages} height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images4'] ? this.state.listing['images4'] : NoImages} height="400px" width="500"/></a>
		        </Slider>
				<div className="container">
					<div className="row sticky-wrapper">
						<div className="col-lg-8 col-md-8 padding-right-30">

							<div id="titlebar" className="listing-titlebar">
								<div className="listing-titlebar-title">
									<h2>{this.state.listing['title']}<span className="listing-tag">{this.state.listing['category']}</span></h2>
									<p>Price:RM {this.state.listing['price']} / {this.state.listing['rate']}</p>
									<span>
										<a href="listings-single-page.html#listing-location" className="listing-address">
											<i className="fa fa-map-marker"></i>
											{this.state.listing['city']}, {this.state.listing['state']}
										</a>
									</span>
									<div className="star-rating" data-rating="5">
										<div className="rating-counter"><a href="listings-single-page.html#listing-reviews">(0 reviews)</a></div>
									</div>
								</div>
							</div>

							<div id="listing-nav" className="listing-nav-container">
								<ul className="listing-nav">
									<li><a href="details#listing-overview" className="active">Description</a></li>
									<li><a href="details#listing-reviews">Reviews</a></li>
									<li><a href="details#add-review">Add Review</a></li>
								</ul>
							</div>
							
							<div id="listing-overview" className="listing-section">
								{this.state.listing['description']}
							</div>
							<hr/>

							<Review
							listing_id={this.state.listing['id']}
							/>

						</div>
						<div className="col-lg-4 col-md-4 margin-top-75 sticky">
							<div className="boxed-widget margin-top-35">
								<h3>Contact</h3>
								<center><p><img className="img-circle" src={this.state.user['picture']} width="150px" height="150px"/></p></center>
								<ul className="listing-details-sidebar">
									<li><i className="sl sl-icon-user"></i>{this.state.user['name']}</li>
								</ul>

								<ul className="listing-details-sidebar social-profiles">
									<li><a href={'http://facebook.com/'+this.state.user['facebook']+''} className="facebook-profile"><i className="fa fa-facebook-square"></i> Facebook</a></li>
									<li><a href={this.state.user['twitter']} className="twitter-profile"><i className="fa fa-twitter"></i> Twitter</a></li>
								</ul>
								<div className="row">
								<center><a onClick={this.show('blurring')} className="send-message-to-owner button popup-with-zoom-anim"> Hire Hobbez</a></center>
								</div>
							</div>

						</div>
						{this.state.loggedin ?  
			              <Modal size='small' dimmer={dimmer} open={open} onClose={this.close}>
				          <Modal.Header>Task Details</Modal.Header>
				          <Segment>
				          <Modal.Content>
				            <Modal.Description>
						     <Form>
							     <Form.Field>
								      <label>Name</label>
								      <input name='name' value={name} disabled/>
								  </Form.Field>
								  <Form.Field>
								      <label>Email</label>
								      <input name='email' value={email} disabled/>
								  </Form.Field>
					              <Form.TextArea label='Description:' name="description"  placeholder='Briefly explain your task' value={description} onChange={this.handleChanges} />
					              <Form.Select label='When to start:' name="duration" options={options} placeholder='Choose' value={duration} onChange={this.handleLogChanges}/>
				              </Form>
				              <br/>
				              <center><Header as='h1'>Total: RM{this.state.listing['price']}</Header></center>
				              <Header as='h6' style={{color:'orange'}}>*Money back guranteed if Hobbez cannot completed the task in given duration.</Header>
				            </Modal.Description>
				          </Modal.Content>
				          </Segment>
				          <Modal.Actions>
				            <Button color='black' onClick={this.close}>
				              Cancel
				            </Button>
				            <Button positive icon='checkmark' labelPosition='right' content="Continue with payment" onClick={this.handlePayment}/>
				          </Modal.Actions>
				        </Modal>: 
			              <Modal size='small' dimmer={dimmer} open={open} onClose={this.close}>
				          <Modal.Header>Hobbez Hiring</Modal.Header>
				          <Segment>
				          <Modal.Content>
				            <Modal.Description>
				              <center><Header as='h1'>Please login to hire this Hobbez</Header></center>
				            </Modal.Description>
				          </Modal.Content>
				          </Segment>
				          <Modal.Actions>
							<Button color='red' content="Register" onClick={this.handleRedirect}/>
				            <Button color='blue' content="Login" onClick={this.handleRedirect}/>
				          </Modal.Actions>
				        </Modal>
			          	}
			          	<WaitingPayment
			          	open={open_modal}
			          	dimmer={'blurring'}
			          	bill_id={bill_id}
			          	phone={this.state.user['phone']}
			          	listing_title={this.state.listing['title']}
			          	customer_number={this.state.customer_number}
			          	/>
					</div>
				</div>
			</div>
			)
	}
}

export default ListingDetails;