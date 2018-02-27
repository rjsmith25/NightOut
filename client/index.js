//intitalize app and render

import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import searchReducer from '../Redux/search/searchReducer';
import { render } from 'react-dom';
import App from './app';

function rootReducer(state={}, action){
	return {
		searchString: searchReducer(state.searchString,action)
	}
}

function reduxDevtool(){
	return typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
}

const store = createStore(rootReducer,compose(applyMiddleware(thunk), reduxDevtool()))

render(<Provider store={store}><App /></Provider>, document.getElementById('app'))
