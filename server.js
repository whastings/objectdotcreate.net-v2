import broccoli from 'broccoli/lib/middleware';
import builder from './lib/builder';
import express from 'express';
import handlebars from 'express-handlebars';
import renderReact from './middleware/renderReact';

const IS_PROD = process.env.NODE_ENV === 'production';

// Routes:
import homeRoute from './routes/home';

var PORT = 8000;

var app = express();

// App settings:
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Apply routes.
[homeRoute].forEach(route => route(app));

// Apply post-routes middleware.
app.get('*', renderReact());

// Asset rebuilding in dev.
if (!IS_PROD) {
  app.use(broccoli(builder.watcher()));
}

console.log(`Listening on ${PORT}`);
app.listen(PORT);
