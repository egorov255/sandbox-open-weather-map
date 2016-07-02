export const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Yippie! Support Loop Administration</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
      </head>
      <body>
        <div class="container-fluid">
          <div id="root">${html}</div>
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

export const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = `${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}`;
  const html = `Server Error:<br><br><pre style="color:red">${errTrace}</pre>`;

  return renderFullPage(html, {});
};
