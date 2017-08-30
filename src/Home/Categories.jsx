import React, {Component} from 'react'
import {Reveal} from 'semantic-ui-react'


class Categories extends React.Component{

	onAll(e){
		localStorage.setItem("categories", 'All Categories');
		window.location = '/listing'
	}
	onEatDrink(e){
		localStorage.setItem("categories", 'Photography');
		window.location = '/listing'
	}
	onHomes(e){
		localStorage.setItem("categories", 'Homes');
		window.location = '/listing'
	}
	onDeliveries(e){
		localStorage.setItem("categories", 'Deliveries');
		window.location = '/listing'
	}
	onTechnologies(e){
		localStorage.setItem("categories", 'Technologies');
		window.location = '/listing'
	}
	onFitness(e){
		localStorage.setItem("categories", 'Vehicle');
		window.location = '/listing'
	}

	render(){
		return(
			<div className="container">
	          <div className="row">
	            <div className="col-md-12">
	              <div className="categories-boxes-container margin-top-5 margin-bottom-30">
	                
	                <a className="category-small-box" onClick={this.onAll}>
	                  <i className="im im-icon-Happy"></i>
	                  <h4>All</h4>
	                </a>
	                

	                <a className="category-small-box" onClick={this.onEatDrink}>
	                  <i className="im im-icon-Camera-3"></i>
	                  <h4>Photography</h4>
	                </a>

	                <a onClick={this.onHomes} className="category-small-box">
	                  <i className="im im-icon-Home-5"></i>
	                  <h4>Homes</h4>
	                </a>

	                <a onClick={this.onDeliveries} className="category-small-box">
	                  <i className="im im-icon-Map2"></i>
	                  <h4>Deliveries</h4>
	                </a>

	                <a onClick={this.onTechnologies} className="category-small-box">
	                  <i className="im im-icon-Monitor-phone"></i>
	                  <h4>Technologies</h4>
	                </a>

	                <a onClick={this.onFitness} className="category-small-box">
	                  <i className="fa fa-car"></i>
	                  <h4>Vehicle</h4>
	                </a>

	              </div>
	            </div>
	          </div>
	        </div>
			)
	}
}
export default Categories;