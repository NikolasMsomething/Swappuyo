import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postToSwapuyoLoginAction } from '../actions/index';

class Demo extends Component {
  state = {};

  componentDidMount() {
    console.log('hello');
    this.props.dispatch(postToSwapuyoLoginAction('testaccount123', 'password123'));
  }

  render() {
    return <div>{this.props.authToken && <Redirect to="/home" />}</div>;
  }
}

function mapStateToProps(state) {
  return { authToken: state.loginReducer.authToken };
}

export default connect(mapStateToProps)(Demo);
