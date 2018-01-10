import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';

if(module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Hello />,
  document.getElementById('app')
);

console.log('hmr 嗨起来')