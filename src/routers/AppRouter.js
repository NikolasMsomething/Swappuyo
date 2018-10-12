import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Work from '../components/Work';
import Contact from '../components/Contact';
import NotFound from '../components/NotFound';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/work" component={Work} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;
