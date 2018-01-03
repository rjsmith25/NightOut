import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Localbars from './Localbars';


const App = () => {
  return (
   <BrowserRouter>
    <div>
 	  <Route exact path="/" component={Landing} />
 	  <Route path="/localbars" component={Localbars} />
    </div>
   </BrowserRouter>
  ) 
}

export default App;