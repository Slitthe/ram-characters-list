import React from 'react';
import {
  BrowserRouter,
  Redirect, 
  Route,
  Switch
} from 'react-router-dom';
import Character from '../pages/Character';
import Home from '../pages/CharactersListing';

export enum ERouterUrl {
  default = '/home',
  home = '/home',
  character = '/character/:id',
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
        <Route
          path={ERouterUrl.character}
          children={<Character />}
        />
        <Redirect from="*" to={ERouterUrl.default}/>
      </Switch>
    </BrowserRouter>
  );
}

export default PagesRouter;
