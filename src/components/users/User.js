import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

class User extends Component {
  componentDidMount() {
    // login comes from App.js, path='/user/:login'
    this.props.getUser(this.props.match.params.login);
    this.props.getRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company
    } = this.props.user;

    const { loading, repos } = this.props;
    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back
        </Link>

        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt='avatar'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>

            <p>Location: {location}</p>
            <p>
              Hirable :{' '}
              {hireable ? (
                <i className='fa fa-check text-success' />
              ) : (
                <i className='fa fa-times-circle text-danger' />
              )}
            </p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <br />
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
              <a href={html_url} className='btn btn-success my-1'>
                Github
              </a>
            </ul>
          </div>
        </div>

        <div className='card text-center'>
          <div className='badge badge-dark'>Followers: {followers}</div>
          <div className='badge badge-dark'>Following: {following}</div>
          <div className='badge badge-dark'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default User;
