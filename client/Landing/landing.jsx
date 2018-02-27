import React , { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchString, clearSearchString  } from '../../Redux/search/searchAction';

class Landing extends Component {
	constructor(props){
	 super(props)
	 this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
	}

 componentDidMount(){
   if(this.props.searchString){
     this.props.dispatch(clearSearchString())
   }
 }

 handleChange(e){
   this.props.dispatch(setSearchString(e.target.value));
 }

 handleSubmit(e){
   e.preventDefault()
   if(this.props.searchString){
     this.props.history.push('/local-bars');
   }
 }

	render(){
		return (
			<section className="landing">
				<h1>Night Out <i className="fa fa-glass" aria-hidden="true"></i></h1>
				<p>Visit bars near you ( please drink responsibly )</p>
				<form onSubmit={this.handleSubmit} className="searchbars">
					<input onChange={this.handleChange} type="text" placeholder="Find Bar in your city..." />
					<button className="searchbtn">Search</button>
				</form>
			</section>
		)
	}
}

function mapStateToProps(state) {
  return {
    searchString: state.searchString
  }
}

export default connect(mapStateToProps)(Landing);
