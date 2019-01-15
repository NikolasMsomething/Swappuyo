import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import TradeHub from '../components/TradeHub';
import WantList from '../components/WantList';
import Register from '../components/Register';
import RedditTokenRedirectPage from '../components/RedditTokenRedirect/RedditTokenRedirectPage';
import Header from '../components/Header';
import SideDrawer from '../components/SideDrawer';
import Backdrop from '../components/Backdrop/Backdrop.js';
import { connect } from 'react-redux';
import LandingPage from '../components/LandingPage';
import Demo from '../components/Demo';
//HISTORY CREATED SO I CAN MAKE LANDING PAGE NOT HOLD HEADER

class AppRouter extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    let backdrop;
    let header;

    if (this.props.sideDrawerOpen) {
      backdrop = <Backdrop />;
    }
    if (this.props.authToken && this.props.refreshToken) {
      header = <Header />;
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          {header}
          <SideDrawer />
          {backdrop}
          <Switch>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/trade-hub" component={TradeHub} exact={true} />
            <Route path="/want-list" component={WantList} exact={true} />
            <Route path="/demo" component={Demo} exact={true} />
            {/* <Route component={NotFound} /> */}
            <Route
              path="/RedditTokenRedirect"
              component={RedditTokenRedirectPage}
              exact={true}
            />
            <Route path="/" exact={true} component={LandingPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    sideDrawerOpen: state.sideDrawerReducer.sideDrawerOpen,
    authToken: state.loginReducer.authToken,
    refreshToken: state.loginReducer.refreshToken
  };
}

export default connect(mapStateToProps)(AppRouter);
