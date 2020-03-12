// Imports
//////////

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
import Axios from 'axios';

class App extends Component {
  // Initialize state
  ///////////////////

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // Search all Github users matching name entered in text field
  //////////////////////////////////////////////////////////////

  searchUsers = async text => {
    this.setState({
      loading: true
    });

    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // Set state to response data
    /////////////////////////////
    console.log(res);
    if (res.data.total_count === 0) {
      console.log('nothing here');
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        users: res.data.items,
        loading: false
      });
    }
  };

  // Get single Github user when 'More' button is clicked, username = login
  /////////////////////////////////////////////////////////////////////////

  getUser = async username => {
    this.setState({
      loading: true
    });

    const res = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // Set state to response data
    /////////////////////////////

    this.setState({
      user: res.data,
      loading: false
    });
  };

  // Get repos
  ////////////

  getRepos = async username => {
    this.setState({
      loading: true
    });

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      repos: res.data,
      loading: false
    });
  };

  // Clear users from state
  /////////////////////////

  clearUsers = () => this.setState({ users: [], loading: false });

  // If no name is entered, display alert
  ///////////////////////////////////////

  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />

            {/* We want to wrap all the routes in a switch so it shows one route at a time. */}
            {/* router > App > container > switch > route > render > fragment > component  */}
            <Switch>
              {/* Search and Users route  */}
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />

              {/* About route */}
              <Route exact path='/about' component={About} />

              {/* Single User route*/}
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <Fragment>
                    <User
                      {...props}
                      getUser={this.getUser}
                      getRepos={this.getRepos}
                      user={user}
                      repos={repos}
                      loading={loading}
                    />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
