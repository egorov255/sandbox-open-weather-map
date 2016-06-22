import Express from 'express';
import webpack from 'webpack';
import WebpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { fetchComponentData } from './fetchData';

const app = new Express();

const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: WebpackConfig.output.publicPath,
}));

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, async (err, redirectLocation, renderProps) => {
    if (err) {
      return next(err);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore({});

    try {
      await fetchComponentData(store, renderProps.components, renderProps.params);
      const query = qs.stringify(req.query);
      const appComponent = await renderApp(store, <RouterContext {...renderProps} />, {
        apiUrl: ServerConfig.authAndApiOrigin,
        isServer: true,
        cookies: req.get('Cookie'),
        currentLocation: req.path + (query.length ? `?${query}` : ''),
      });
      const initialView = renderToString(<Provider store={store}>{appComponent}</Provider>);
      const finalState = store.getState();

      return res.status(200).end(renderFullPage(initialView, finalState));
    } catch (e) {
      return next(e);
    }
  });
});
app.listen(3001);

export default app;
