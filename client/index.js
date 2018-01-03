//intitalize app and render

import React from 'react';
import { render } from 'react-dom';
import App from './app';


const renderApp = ()=> {
  render(<App />, document.getElementById('app'))
}

renderApp()

if(module.hot) {
 module.hot.accept('./app',()=>{
  renderApp()
 })
}