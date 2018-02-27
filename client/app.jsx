import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Landing from './Landing';
import Localbars from './Localbars';
import { auth } from '../service';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user)=> {
      this.setState({
        currentUser: user
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
       <div>
         <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
       	  <Route path="/local-bars" component={(props)=> { return <Localbars user={this.state.currentUser} {...props} />}} />
         </Switch>
       </div>
      </BrowserRouter>
    )
  }
}

export default App;
