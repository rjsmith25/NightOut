import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Localbars from './Localbars';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
			searchString: ""
		}

		this.setSearchString = this.setSearchString.bind(this);
  }

  setSearchString(event){
		this.setState({
			searchString: event.target.value
		})
	}

  render() {
    return (
      <BrowserRouter>
       <div>
         <Switch>
          <Route exact path="/" component={ (props)=> { return <Landing searchString={this.state.searchString} setSearchString={this.setSearchString}  />} } />
       	  <Route path="/localbars" component={Localbars} />
         </Switch>
       </div>
      </BrowserRouter>
    )
  }
}

export default App;
