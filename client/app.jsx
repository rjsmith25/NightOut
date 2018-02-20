import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Localbars from './Localbars';

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
       <div>
         <Switch>
          <Route exact path="/" component={Landing} />
       	  <Route path="/local-bars" component={Localbars} />
         </Switch>
       </div>
      </BrowserRouter>
    )
  }
}

export default App;
