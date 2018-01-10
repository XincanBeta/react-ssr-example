const express = require('express');
const fs = require('fs');
const path = require('path');
// const reload = require('reload');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../build/webpack.config.js');
const compiler = webpack(webpackDevConfig)

import Hello from '../src/Hello';

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<Hello />);
  fs.readFile(path.join(__dirname, '../index.html'), 'utf8', function (err, data) {
    if (err) throw err;
    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
    res.send(document);
  });
}

const app = express();
const port = '4000';

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true
  /*devtool: 'eval-source-map',
  hot: true,
  inline: true,
  proxy: {},ulti
  stats: {
    colors: true
  }*/
}));

app.use(webpackHotMiddleware(compiler));

// Serve built files with static files middleware
// app.use('/static', express.static(path.join(__dirname, '../dist')));

// Serve requests with our handleRender function
app.get('/', handleRender);

// const server = http.createServer(app);
// reload(app);

app.listen(port, function(err){
  if (err) {
    return console.log(err);
  }
  console.log(`Web server listening on port ${port}`);
});