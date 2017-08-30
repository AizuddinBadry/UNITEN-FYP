import React from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import Review from './Review'
import { Button, Form, Input, TextArea, Select, Modal, Icon, Segment, Header, Dimmer, Loader } from 'semantic-ui-react'


class ListingDetails extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {listing: [],user:[],open:false,load:false};
	  }
	componentDidMount() {
	var self = this;
     axios.get('http://localhost:3001/listing/view/'+ localStorage.getItem('listing_id'))
        .then(function (response) {
          console.log(response.data);
          self.setState({listing: response.data['listing'], user: response.data['user']})
        })
        .catch(function (error) {
          console.log(error);
        });
	}

	handleHiring = () =>
	{
		var self = this;
		axios.post('http://localhost:3001/listing/hire',{
     	number_to_send_to:"+6"+self.state.user['phone'],
     	job_names:self.state.listing['title']
	     })
	        .then(function (response) {
	          console.log(response.data);
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
	}
	show = dimmer => () => this.setState({ dimmer, open: true })
  	close = () => this.setState({ open: false })
	render(){
		const { open, dimmer, load } = this.state
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
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images']}  height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images2']} height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images3']} height="400px" width="500"/></a>
		          <a href={this.state.listing['images']} className="item mfp-gallery"><img src={this.state.listing['images4']} height="400px" width="500"/></a>
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
							<Review/>
						</div>
						<div className="col-lg-4 col-md-4 margin-top-75 sticky">
							<div className="boxed-widget margin-top-35">
								<h3>Contact</h3>
								<center><p><img className="img-circle" src={this.state.user['picture']} width="150px" height="150px"/></p></center>
								<ul className="listing-details-sidebar">
									<li><i className="sl sl-icon-user"></i>{this.state.user['name']}</li>
									<li><i className="sl sl-icon-phone"></i>{this.state.user['phone']}</li>
								</ul>

								<ul className="listing-details-sidebar social-profiles">
									<li><a href={'http://facebook.com/'+this.state.user['facebook']+''} className="facebook-profile"><i className="fa fa-facebook-square"></i> Facebook</a></li>
									<li><a href={this.state.user['twitter']} className="twitter-profile"><i className="fa fa-twitter"></i> Twitter</a></li>
								</ul>
								<div className="row">
								<center><a onClick={this.show('blurring')} className="send-message-to-owner button popup-with-zoom-anim"> Hire Hobbez</a></center>
								</div>
							</div>
							<div className="listing-share margin-top-40 margin-bottom-40 no-border">
								<button className="like-button"><span className="like-icon"></span> Bookmark this listing</button> 
								<span>1 people bookmarked this listing</span>
									<div className="clearfix"></div>
							</div>

						</div>
						 <Modal size='small' dimmer={dimmer} open={open} onClose={this.close}>
				          <Modal.Header>Task Details</Modal.Header>
				          <Segment>
				          <Modal.Content>
				            <Modal.Description>
				            
				            <Dimmer active={load}>
						        <Loader>Waiting for payment</Loader>
						     </Dimmer>
				              <Form.TextArea label='Details'  placeholder='Briefly explain your task...' />
				              <Form.Select label='Task Duration' options={options} placeholder='Duration' />
				              <Header as='h5' style={{color:'orange'}}>*Refund will be given if Hobbez cannot complete the task.</Header>

				            </Modal.Description>
				          </Modal.Content>
				          </Segment>
				          
				          <Modal.Actions>
				            <Button color='black' onClick={this.close}>
				              Cancel
				            </Button>
				            <Button positive icon='checkmark' labelPosition='right' content="Continue with payment" onClick={this.close} />
				          </Modal.Actions>
				        </Modal>

					</div>
				</div>
			</div>
			)
	}
}

export default ListingDetails;