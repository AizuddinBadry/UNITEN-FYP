import React, {Component} from 'react'
import axios from 'axios'

class Listing extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {categories: '',listing: []};
	  }

	componentDidMount() {
	this.setState({categories: localStorage.getItem('categories')})
	var self = this;
     axios.post('http://localhost:3001/listing/all',{
     	category:localStorage.getItem('categories'),
     })
        .then(function (response) {
          console.log(response.data);
          self.setState({listing: response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
	}

	onClickListing = (e) =>{
		localStorage.setItem('listing_id', e.target.id)
		if((localStorage.getItem('listing_id')))
		{
			var listing_id = localStorage.getItem('listing_id')
			window.location = '/listing/'+listing_id
		}
		else
		{
			
		}
		
	}
	render(){
	var self = this;
	  const services_listing = this.state.listing.map(function(index){
	    return(
	       <div className="col-lg-4 col-md-6" key={index.id}>
			<a className="listing-item-container compact" onClick={self.onClickListing}>
				<div className="listing-item" id={index.id}>
					<img src={index.images} alt=""/>
					<div className="listing-item-content">
						<div className="numerical-rating">{"RM "+index.price}</div>
						<h3>{index.title}</h3>
						<span>{index.city},{index.state}</span>
					</div>
					<span className="like-icon"></span>
				</div>
			</a>
		</div>
	      )
	    })

		return(
			<div>
				<div>
					<div id="titlebar" className="gradient">
						<div className="container">
							<div className="row">
								<div className="col-md-12">

									<h2>{this.state.categories}</h2>
									<nav id="breadcrumbs">
										<ul>
											<li><a href="/">Home</a></li>
											<li>Listings</li>
										</ul>
									</nav>

								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row">
							
							<div className="col-md-12">
								<div className="main-search-input gray-style margin-top-0 margin-bottom-10">

									<div className="main-search-input-item">
										<input type="text" placeholder="What are you looking for?" value=""/>
									</div>
									<button className="button">Search</button>
								</div>
							</div>

							<div className="col-md-12">

								<div className="row">
								{services_listing}

								</div>

								<div className="clearfix"></div>
								<div className="row">
									<div className="col-md-12">

										<div className="pagination-container margin-top-20 margin-bottom-40">
											<nav className="pagination">
												<ul>
													<li><a href="listings-grid-full-width.html#" className="current-page">1</a></li>
													<li><a href="listings-grid-full-width.html#">2</a></li>
													<li><a href="listings-grid-full-width.html#">3</a></li>
													<li><a href="listings-grid-full-width.html#"><i className="sl sl-icon-arrow-right"></i></a></li>
												</ul>
											</nav>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default Listing;