import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import 'Assets/css/style-ver=1.1.css';
import 'Assets/css/colors/main.css';
import 'semantic-ui-css/semantic.css';
import Home from 'Home/Main';
import Listing from 'Listing/Main';
import Dashboard from 'Dashboard/Main';

const routes = [
  { path: '/',
    exact: true,
    main: () => <Home/>
  },
    { path: '/login',
    exact: true,
    main: () => <Home/>
  },
  { path: '/registration',
    exact: true,
    main: () => <Home/>
  },
  { path: '/listing',
    exact: true,
    main: () => <Listing/>
  },
  { path: '/listing/:id',
    exact: true,
    main: () => <Listing/>
  },
  { path: '/dashboard',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/add_listing',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/my_listing',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/my_orders',
    exact: true,
    main: () => <Dashboard/>
  },
]
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        </div>
      </Router>
    );
  }
}


export default Main;
