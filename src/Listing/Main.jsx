import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from 'Core/Header'
import Footer from 'Core/Footer'
import Listing from 'Listing/Listing'
import ListingDetails from 'Listing/ListingDetails'
import {Sticky} from 'semantic-ui-react'

const routes = [
  { path: '/listing',
    exact: true,
    main: () => <Listing/>
  },
  { path: '/listing/:id',
    exact: true,
    main: () => <ListingDetails/>
  },

]
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
        <Header/>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        <Footer/>
        </div>
      </Router>
    );
  }
}


export default Main;
