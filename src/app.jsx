import React from 'react';

const App = (props) => (<div>{props.children}</div>);
App.propTypes = {
  children: React.PropTypes.node,
};

export function renderApp(store, children, { cookies, isServer, currentLocation, apiUrl } = {}) {
  return store.dispatch(configure(

    {
      apiUrl,
      tokenValidationPath: '/auth/me',
      authProviderPaths: {
        google: '/auth/google',
      },
    },
    { isServer, cookies, currentLocation }
  )).then(() => (<App>{children}</App>));
}
