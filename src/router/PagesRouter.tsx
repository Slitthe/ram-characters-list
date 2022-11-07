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
  default = '/characters',
  home = '/characters',
  characters = '/character/:id',
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
          path={ERouterUrl.characters}
          children={<Character />}
        />
        <Redirect from="*" to={ERouterUrl.default}/>
      </Switch>
    </BrowserRouter>
  );
}

export default PagesRouter;
