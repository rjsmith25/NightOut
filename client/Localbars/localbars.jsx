import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Header } from '../Common';
import Baritems from './baritems';
import { getBars } from '../api';

class Localbars extends Component {
	constructor(props){
    super(props)
		this.state = {
			bars: [],
			err: null
		}
  }

	componentDidMount(){
		getBars(this.props.searchString).then((res)=>{
			 this.setState({
				 bars: res.data
			 })
		 })
		 .catch((err)=>{
			 this.setState({
				 err: `can not find bars for city: ${this.props.searchString} try searching a different city`
			 })
		 })
	}

	render() {
		let renderContent;

		if(this.state.err){
			renderContent = <p>{this.state.err}</p>
		}else {
			renderContent = this.state.bars.map((bar)=>{
								      return <Baritems key={bar.id} bar={bar} user={this.props.user} history={this.props.history} />
						         })
		}
    return (
			<div>
      	<Header user={this.props.user} />
		    <section className="bars">
		       <div className="container">
		       	  { renderContent }
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
