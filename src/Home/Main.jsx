import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from 'Core/Header'
import Footer from 'Core/Footer'
import Home from 'Home/Home'
import Login from 'Home/Login';
import Registration from 'Home/Registration';

const routes = [
  { path: '/',
    exact: true,
    main: () => <Home/>
  },
  { path: '/login',
    exact: true,
    main: () => <Login/>
  },
  { path: '/registration',
    exact: true,
    main: () => <Registration/>
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
