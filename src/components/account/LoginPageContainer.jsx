import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';
import { loginAttempt, loginSuccess, loginFailure } from '../../actions/authentication';

import LoginPage from './LoginPage';

export class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.attemptLogIn = this.attemptLogIn.bind(this);

    // component state
    this.state = {
      redirect: false,
    };
  }

  async attemptLogIn(userData) {
    const {
      decrementProgressAction,
      incrementProgressAction,
      loginAttemptAction,
      loginFailureAction,
      loginSuccessAction,
    } = this.props;

    // turn on spinner
    incrementProgressAction();

    // register that a login attempt has been made
    loginAttemptAction();

    // contact login API
    await fetch(
      // where to connect
      '/api/authentication/login',

      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) { // successful login
        return response.json();
      }
      return null; // failed login
    })
    .then((json) => {
      if (json) {
        loginSuccessAction(json);
        this.setState({ redirect: true }); // redirect when login success
      } else {
        loginFailureAction(new Error('Authentication Failed'));
      }
    })
    .catch((error) => {
      loginFailureAction(new Error(error));
    });

    // turn off spinner
    decrementProgressAction();
  }

  render() {
    const { redirect } = this.state; // redirect when login success

    if (redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <LoginPage loginFunction={this.attemptLogIn} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
    loginAttemptAction: loginAttempt,
    loginFailureAction: loginFailure,
    loginSuccessAction: loginSuccess,
  }, dispatch);
}

// Connect this LoginPageContainer component to Redux
export default connect(null, mapDispatchToProps)(LoginPageContainer);
