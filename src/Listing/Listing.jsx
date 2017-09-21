import React, {Component} from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import {Button} from 'semantic-ui-react'

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

	onChangeCategories = (e) =>{
		localStorage.setItem('categories', e.target.value)
		window.location = '/listing'
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
							<div className="row margin-bottom-25 margin-top-30">
							<div className="col-md-12">
								<div className="fullwidth-filters">
									
									<div className="panel-dropdown float-left">
										<a href="listings-grid-full-width.html#">Categories</a>
										<div className="panel-dropdown-content">
											<div className="row">
											<Button.Group size='large' vertical>
											<center>
												<Button value='All Categories' color='red' onClick={this.onChangeCategories}>All</Button><br/>
												<Button value='Photography' color='green' onClick={this.onChangeCategories}>Photography</Button><br/>
												<Button value='Makeup' color='pink' onClick={this.onChangeCategories}>Makeup</Button><br/>
												<Button value='Writing' color='grey' onClick={this.onChangeCategories}>Writing</Button><br/>
												<Button value='Graphic Design' color='purple' onClick={this.onChangeCategories}>Graphic Design</Button><br/>
												<Button value='Cleaning' color='yellow' onClick={this.onChangeCategories}>Cleaning</Button><br/>
												<Button value='Programming' color='teal' onClick={this.onChangeCategories}>Programming</Button><br/>
											</center>
											</Button.Group>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

							<div className="col-md-12">

								<div className="row">
								<InfiniteScroll
								    pageStart={0}
								    hasMore={true}
								>
								    {services_listing}
								</InfiniteScroll>
								</div>

								<div className="clearfix"></div>
							</div>

						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default Listing;