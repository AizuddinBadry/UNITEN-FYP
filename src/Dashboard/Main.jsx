import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from 'Dashboard/DashboardHeader'
import Dashboard from 'Dashboard/dashboard'
import Sidebar from './DashboardSidebar'
import AddListing from './DashboardAddListing'
import MyListing from './DashboardMyListing'
import MyOrders from './DashboardMyOrder'
import MyTask from 'Dashboard/DashboardMyTask'
import {Sticky} from 'semantic-ui-react'

const routes = [
  { path: '/dashboard',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/add_listing',
    exact: true,
    main: () => <AddListing/>
  },
  { path: '/my_listing',
    exact: true,
    main: () => <MyListing/>
  },
  { path: '/my_orders',
    exact: true,
    main: () => <MyOrders/>
  },
   { path: '/my_task',
    exact: true,
    main: () => <MyTask/>
  },

]
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
        <Header/>
        <Sidebar/>
          <div className="dashboard-content">
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            </div>
        </div>
      </Router>
    );
  }
}


export default Main;
