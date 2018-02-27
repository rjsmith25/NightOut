import React, { Component } from 'react';
import axios from 'axios';

class Baritems extends Component {
	constructor(props){
    super(props)
		this.GoingToBar = this.GoingToBar.bind(this);
		this.isGoing = this.isGoing.bind(this);
		this.getbarAttendee = this.getbarAttendee.bind(this);
  }

	isGoing(user,attendance){
		for(let i = 0; i < attendance.length; i++){
			if(attendance[i].uid === user.uid){
				return true;
			}
		}
		return false;
	}

	getbarAttendee(user,attendance){
		return attendance.find((attendee)=>{
			return user.uid === attendee.uid
		})
	}

	GoingToBar(){
		if(!this.props.user){
			this.props.history.push('/login');
		}

		if(this.isGoing(this.props.user,this.props.bar.attendance)){
			let user = this.getbarAttendee(this.props.user,this.props.bar.attendance);
			axios.delete(`http://localhost:3000/api/bar/${this.props.bar._id}\/attendee\/${user._id}`)
			     .then((bar)=>{
						 console.log('bar is deleted');
					 })
					 .catch((err)=>{
						 console.error(err);
					 })
			 return
		}

		// axios.post('http://localhost:3000/api/bar',{
		// 	bar_id: this.props.bar.id,
		// 	uid: this.props.user.uid,
		// 	name: this.props.user.email
		// })
		// .then((res)=>{
		// 	console.log(res.data);
		// })
		// .catch((err)=>{
		// 	console.log(err);
		// })

	}

	render() {
    return (
			<div className="bar-item">
				<img src={this.props.bar.image} alt="a local bar" className="bar-img" />
				<div className="bar-description">
					<p className="bar-name">{this.props.bar.name}</p>
					<button onClick={this.GoingToBar} className="attending">{`${this.props.bar.attendance.length} Going`}</button>
			   </div>
      </div>
    )
  }
}

export default Baritems;
