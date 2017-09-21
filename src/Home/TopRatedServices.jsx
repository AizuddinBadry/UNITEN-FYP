import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class TopRatedServices extends Component{

  onAll(e){
    localStorage.setItem("categories", 'All Categories');
    window.location = '/listing'
  }
  onPhotography(e){
    localStorage.setItem("categories", 'Photography');
    window.location = '/listing'
  }
  onMakeup(e){
    localStorage.setItem("categories", 'Makeup');
    window.location = '/listing'
  }
  onWriting(e){
    localStorage.setItem("categories", 'Writing');
    window.location = '/listing'
  }
  onGraphicDesign(e){
    localStorage.setItem("categories", 'Graphic Design');
    window.location = '/listing'
  }
  onCleaning(e){
    localStorage.setItem("categories", 'Cleaning');
    window.location = '/listing'
  }
  onProgramming(e){
    localStorage.setItem("categories", 'Programming');
    window.location = '/listing'
  }

render(){
  return(
        <div className="container">
            <div className="row">

              <div className="col-md-12">
                <h3 className="headline centered margin-bottom-45">
                  Explore The Hobbez Marketplace
                  <span>Get help to complete your task</span>
                </h3>
              </div>

              <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onPhotography}>
                    <div className="listing-item">
                      <img src="images/photography.jpg" alt=""/>
                      <div className="listing-item-content">
                        <span className="tag">Photography</span>
                      </div>
                      
                    </div>
                    <div className="star-rating" style={{backgroundColor:'teal'}}>  
                    </div>
                  </a>
                </div>
                </div>
                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onMakeup}>
                    <div className="listing-item">
                      <img src="images/makeup.jpg" alt=""/>
                      <div className="listing-item-content">
                        <span className="tag">Make Up</span>
                      </div>
                      
                    </div>
                    <div className="star-rating" style={{backgroundColor:'#DC4271'}}>  
                    </div>
                  </a>
                </div>
                </div>
                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onWriting}>
                    <div className="listing-item">
                      <img src="images/writing.jpg" alt=""/>
                      <div className="listing-item-content">
                        <span className="tag">Writing</span>
                      </div>
                      
                    </div>
                    <div className="star-rating" style={{backgroundColor:'gray'}}>  
                    </div>
                  </a>
                </div>
                </div>

                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onGraphicDesign}>
                    <div className="listing-item">
                      <img src="images/graphic.jpg" alt=""/>
                      <div className="listing-item-content">
                        <span className="tag">Graphic Design</span>
                      </div>
                      
                    </div>
                    <div className="star-rating" style={{backgroundColor:'#A242DC'}}>  
                    </div>
                  </a>
                </div>
                </div>

                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onCleaning}>
                    <div className="listing-item">
                      <img src="images/cleaner.jpg" alt=""/>
                      <div className="listing-item-content">
                        <span className="tag">Cleaning</span>
                      </div>
                      
                    </div>
                    <div className="star-rating" style={{backgroundColor:'#DCBB42'}}>  
                    </div>
                  </a>
                </div>
                </div>

                <div className="col-md-4">
                <div className="carousel-item">
                  <a  className="listing-item-container" onClick={this.onProgramming}>
                    <div className="listing-item">
                      <img src="images/programming.jpeg" alt=""/>

                      <div className="listing-item-content">
                        <span className="tag">Programming</span>
                      </div>
                    </div>
                    <div className="star-rating" style={{backgroundColor:'#42DCC2'}}>  
                    </div>
                  </a>
                </div>
                </div>
                
              </div>
              <center><Button color='red' onClick={this.onAll}>Explore All</Button></center>

            </div>
          </div>
        </div>
          );
        }
    }

    export default TopRatedServices;