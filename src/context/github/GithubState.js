import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USER,
  CLEAR_USERS
} from '../types';

// initialize state
///////////////////

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search user
  // get user
  // get repos
  // clear users
  // set loading

  return (
    // wraps the entire application in a provider
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
      }}>
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
