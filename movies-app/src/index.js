import { Switch } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Details from './screens/details/Details';
import '../src/screens/details/Details.css'
import Home from './screens/home/Home';

ReactDOM.render(
  <React.StrictMode>
      {/* <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => (<Home />)}/>
          <Route exact path='/Details/:id' component={() => (<Details />)}/>
        </Switch>
      </BrowserRouter> */}
      <Home />
      </React.StrictMode>,
  document.getElementById('root')
);
