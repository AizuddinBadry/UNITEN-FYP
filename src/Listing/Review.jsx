import React from 'react'
import axios from 'axios'
import picture from 'Assets/images/review_picture.jpg'
import {Form, Button, Feed} from 'semantic-ui-react'


class Review extends React.Component{
	constructor(props) {
		super(props);
		this.state = {name:'', email:'', review:'', review_list:[]}
	}

	componentWillReceiveProps(props) {
		var self = this;
		axios.get('http://localhost:3001/review/listing/' + props.listing_id)
	        .then(function (response) {
	        	self.setState({review_list:response.data})
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
	}

	addReview = () =>{
		var self = this;
		axios.post('http://localhost:3001/review/new',{
			name:self.state.name,
			email:self.state.email,
			review:self.state.review,
			listing_id:self.props.listing_id
		})
	        .then(function (response) {
	        	console.log(response.data)
	        	window.location.reload()
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
	}

	handleChanges = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}

	render(){
		var {name,email,review} = this.state;
		const review_list = this.state.review_list.map(function(index){
			return(
	       		 <Feed.Event
			      image={picture}
			      summary={index.name + ' has created a review'}
			      extraText={index.review}
			    />
	      )
		 })
		
		return(
			<div>
			<div id="listing-reviews" className="listing-section">
				<h3 className="listing-desc-headline margin-top-75 margin-bottom-20">Reviews <span>({review_list.length})</span></h3>
				<Feed>
				{review_list}
				</Feed>
				<div className="clearfix"></div>
			</div>
			<div id="add-review" className="add-review-box">
				<h3 className="listing-desc-headline margin-bottom-20">Add Review</h3>
					<Form>
						<div className="row">
							<div className="col-md-6">
								<label>Name:</label>
								<input name='name' type="text" value={name} onChange={this.handleChanges}/>
							</div>
								
							<div className="col-md-6">
								<label>Email:</label>
								<input name='email' type="text" value={email} onChange={this.handleChanges}/>
							</div>
						</div>

						<div>
							<label>Review:</label>
							<textarea name='review' cols="40" rows="3" value={review} onChange={this.handleChanges}></textarea>
						</div>
						<br/>
					</Form>
					<center><Button color='red'onClick={this.addReview}>Submit Review</Button></center>
				</div>
			</div>
			)
	}
}
export default Review;