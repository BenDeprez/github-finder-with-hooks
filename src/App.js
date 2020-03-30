// Imports
//////////

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />

              {/* We want to wrap all the routes in a switch so it shows one route at a time. */}
              {/* router > App > container > switch > route > render > fragment > component  */}
              <Switch>
                {/* Home route */}
                <Route exact path='/' component={Home} />
                {/* About route */}
                <Route exact path='/about' component={About} />
                {/* Single User route*/}
                <Route exact path='/user/:login' component={User} />
                {/* NotFound User route*/}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
