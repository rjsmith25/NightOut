import React , { Component } from 'react';

class Landing extends Component {
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

	render(){
		return (
			<section className="landing">
				<h1>Night Out <i className="fa fa-glass" aria-hidden="true"></i></h1>
				<p>Visit bars near you ( please drink responsibly )</p>
				<form className="searchbars">
					<input value={this.state.searchString} onChange={this.setSearchString} type="text" placeholder="Find Bars Near You..." />
					<button className="searchbtn">Search</button>
				</form>
			</section>
		)
	}
}

export default Landing;
