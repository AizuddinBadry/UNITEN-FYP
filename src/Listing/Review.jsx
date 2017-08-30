import React from 'react'
import {Form} from 'semantic-ui-react'


class Review extends React.Component{
	render(){
		return(
			<div>
			<div id="listing-reviews" className="listing-section">
				<h3 className="listing-desc-headline margin-top-75 margin-bottom-20">Reviews <span>(0)</span></h3>

				<div className="clearfix"></div>
			</div>
			<div id="add-review" className="add-review-box">
				<h3 className="listing-desc-headline margin-bottom-20">Add Review</h3>
					<Form>
						<div className="row">
							<div className="col-md-6">
								<label>Name:</label>
								<input type="text" value=""/>
							</div>
								
							<div className="col-md-6">
								<label>Email:</label>
								<input type="text" value=""/>
							</div>
						</div>

						<div>
							<label>Review:</label>
							<textarea cols="40" rows="3"></textarea>
						</div>
						<br/>
						<center><button className="button">Submit Review</button></center>
					</Form>
				</div>
			</div>
			)
	}
}
export default Review;