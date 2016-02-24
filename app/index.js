import adminRoutes from 'app/routes/admin';
import appApi from 'app/api';
import authMiddleware from 'app/middleware/auth';
import autobind from 'autobind-decorator';
import blogRoutes from 'app/routes/blog';
import createStore from 'app/createStore';
import currentUserMiddleware from 'app/middleware/currentUser';
import homeRoute from 'app/routes/home';
import MiddlewareMap from 'app/utils/middlewareMap';
import projectsRoute from 'app/routes/projects';
import React from 'react';
import runRouteHandlers from 'app/utils/runRouteHandlers';

const PRE_MIDDLEWARE = {
  '/admin*': [currentUserMiddleware, authMiddleware]
};

const ROUTES = {
  '/': homeRoute,
  '/projects': projectsRoute,
  '/blog': blogRoutes.index,
  '/blog/:post': blogRoutes.view,
  '/admin': adminRoutes.index,
  '/admin/sign-in': adminRoutes.signIn,
  '/admin/posts/new': adminRoutes.newPost
};

export default class App {
  constructor(renderer, onRedirect, api = appApi) {
    this.api = api;
    this.onRedirect = onRedirect;
    this.renderer = renderer;
    this.store = createStore();
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);
  }

  @autobind
  dispatchAction(actionCreator, ...args) {
    let action = actionCreator(this.api, this.store, this.dispatchAction, ...args),
        actionPromise;

    if (action) {
      this.store.dispatch(action);
      actionPromise = action.payload.promise;
    }

    return actionPromise || Promise.resolve(action && action.payload);
  }

  @autobind
  redirect(path) {
    this.onRedirect(path);
  }

  @autobind
  render(component, props) {
    this.renderer(React.createElement(component, props));
  }

  route(path, req) {
    let preMiddleware = this.preMiddleware.match(req.path),
        routeHandler = ROUTES[path],
        handlers = [],
        { store } = this;

    let res = {
      dispatchAction: this.dispatchAction,
      redirect: this.redirect,
      render: this.render
    };

    if (preMiddleware) {
      handlers = handlers.concat(preMiddleware);
    }
    if (routeHandler) {
      handlers.push(routeHandler);
    }

    runRouteHandlers(handlers, [req, res, store]);
  }
}

App.routes = Object.keys(ROUTES);
