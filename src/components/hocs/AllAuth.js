import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Router } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Login from '../../pages/Login';
export default ChildComponent => {
  class AllAuth extends Component {

    render() {
      // const isSignedIn = true
      const { isSignedIn } = this.props
      console.log("isSignedIn ", isSignedIn);

      switch (isSignedIn) {
        case false:
          return <Redirect to ="/login" />;
        case null:
          return <Loader spinning={true} />;
        default:
          return <ChildComponent {...this.props} />;
      }

    }
  }

  function mapStateToProps({ auth: { isSignedIn, roleid } }) {
    return { isSignedIn, roleid };
  }

  return connect(mapStateToProps)(AllAuth)
};