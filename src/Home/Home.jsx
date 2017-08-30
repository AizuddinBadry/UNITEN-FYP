import React, { Component } from 'react';
import SearchBar from 'Home/SearchBar'
import TopRatedServices from 'Home/TopRatedServices'
import Categories from 'Home/Categories'
import {Sticky,Button} from 'semantic-ui-react'

class Home extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.props === 'home') {
     window.location = '/'
    }
  }

  startListing = () =>{
    window.location = '/registration'
  }
  render() {
    return (
      <div>
          <SearchBar/>
          <div className="container">
            <div className="row">

              <div className="col-md-12">
                <h3 className="headline centered margin-top-75">
                  Turn Hobbies into Business
                  <span>Start <i>earning</i> with your hobbies</span>
                </h3>
                <center><Button size='massive' color='red' onClick={this.startListing}>Becomes Hobbez Today</Button></center>
              </div>

            </div>
          </div>

          <section className="fullwidth margin-top-65 padding-top-75 padding-bottom-70" data-background-color="#f8f8f8">

          <TopRatedServices/>

        </section>
        <div className="container">

          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="headline centered margin-top-80">
                Get Your Jobs Done Immedietly 
                <span className="margin-top-25">Explore some of the best Hobbez around Malaysia. Get your task done right away.</span>
              </h2>
            </div>
          </div>

          <div className="row icons-container">
            <div className="col-md-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Map2"></i>
                <h3>Find Your Desire Hobbez</h3>
                <p>Explore some top rated people. </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Mail-withAtSign"></i>
                <h3>Hire Hobbez</h3>
                <p>Hobbez user will get notification through sms.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="icon-box-2">
                <i className="im im-icon-Checked-User"></i>
                <h3>Get Task Done</h3>
                <p>The Hobbez user will get details after payment being made.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
