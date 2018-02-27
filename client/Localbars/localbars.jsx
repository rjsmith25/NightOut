import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Header } from '../Common';
import Baritems from './baritems';
import data from '../../data';
import axios from 'axios';

class Localbars extends Component {
	constructor(props){
    super(props)
		this.state = {
			bars: []
		}
  }

	componentDidMount(){
		axios.get(`http://localhost:3000/bar?location=${this.props.searchString}`)
				 .then((res)=>{
					 this.setState({
						 bars: res.data
					 })
				 })
				 .catch((err)=>{
					 console.error(err);
				 })
	}

	render() {
    return (
			<div>
      	<Header user={this.props.user} />
		    <section className="bars">
		       <div className="container">
		       	  {this.state.bars.map((bar)=>{
		       	  	  return <Baritems key={bar.id} bar={bar} user={this.props.user} history={this.props.history} />
		       	   })
		       	 }
		       </div>
		    </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchString: state.searchString
  }
}

export default connect(mapStateToProps)(Localbars);
