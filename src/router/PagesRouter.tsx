import React from 'react';
import {
  BrowserRouter,
  Redirect, 
  Route,
  Switch
} from 'react-router-dom';
import Home from '../pages/Home';

export enum ERouterUrl {
  default = '/home',
  home = '/home',
}


const PagesRouter = () => {
   return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ERouterUrl.home}
        >
          <Home />
        </Route>
        <Redirect from="*" to={ERouterUrl.default}/>
      </Switch>
    </BrowserRouter>
  );
}

export default PagesRouter;
