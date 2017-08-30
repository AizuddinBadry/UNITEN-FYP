import React, {Component} from 'react';

class SearchBar extends Component{
render(){
  return(
        <div className="main-search-container" data-background-image="http://www.vasterad.com/themes/listeo/images/main-search-background-01.jpg">
            <div className="main-search-inner">

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h2>Find Nearby Services</h2>
                    <h4>Expolore top-rated service provider around you</h4>

                    <div className="main-search-input">

                      <div className="main-search-input-item">
                        <input type="text" placeholder="What are you looking for?" value=""/>
                      </div>

                      <button className="button">Search</button>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          );
        }
    }

    export default SearchBar;