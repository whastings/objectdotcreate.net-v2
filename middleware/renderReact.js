import { renderToString } from 'react-dom/server';
import componentRouter from '../lib/componentRouter';
import React from 'react';

const IS_PROD = process.env.NODE_ENV === 'production';

export default function renderReactMiddleware() {
  return function renderReact(req, res, next) {
    var reactProps = res.reactProps,
        component = reactProps ? componentRouter(res.routePath) : null,
        html;

    if (!component) {
      return next();
    }

    html = renderToString(React.createElement(component, reactProps));

    res.render('base', {html, isProd: IS_PROD});
  };
}
