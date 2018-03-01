import React, { Component } from 'react';
import { getBarById, createBarAttendee, createNewBar, deleteBarAttendee } from '../api';

class Baritems extends Component {
	constructor(props){
    super(props)
		this.state = {
			goingCounter : 0,
			attending: []
		}
		this.GoingToBar = this.GoingToBar.bind(this);
		this.isGoing = this.isGoing.bind(this);
		this.getbarAttendee = this.getbarAttendee.bind(this);
		this.barExist = this.barExist.bind(this);
		this.incrementGoingCounter = this.incrementGoingCounter.bind(this);
		this.decrementGoingCounter = this.decrementGoingCounter.bind(this);
		this.removeAttendee = this.removeAttendee.bind(this);
		this.updateAttendance = this.updateAttendance.bind(this);
		this.addAttendee = this.addAttendee.bind(this);
  }

	componentDidMount(){
		this.setState({
			goingCounter: this.props.bar.attendance.length,
			attending: this.props.bar.attendance
		})
	}

	isGoing(user,attendance){
		for(let i = 0; i < attendance.length; i++){
			if(attendance[i].uid === user.uid){
				return true;
			}
		}
		return false;
	}

	barExist(id){
		return getBarById(id).then((data)=>{
							return true;
					 })
					 .catch((err)=>{
						 return false
					 })
	}

	getbarAttendee(user,attendance){
		return attendance.find((attendee)=>{
			return user.uid === attendee.uid
		})
	}

	incrementGoingCounter(){
		this.setState({
			goingCounter: this.state.goingCounter + 1
		})
	}

	decrementGoingCounter(){
		if(this.state.goingCounter === 0){
			return 0;
		}
		this.setState({
			goingCounter: this.state.goingCounter - 1
		})
	}

	updateAttendance(attendance){
		this.setState({
			attending: [...attendance]
		})
	}

	addAttendee(attendee){
		this.setState({
			attending: [...this.state.attending, attendee]
		})
	}

	removeAttendee(user,attendance){
		 let newattendancelist = attendance.filter((attendee)=>{
			 if(user.uid !== attendee.uid){
				 return attendee
			 }
		 })

		 this.setState({
			 attending : newattendancelist
		 })
	}

	async GoingToBar(){
		if(!this.props.user){
			this.props.history.push('/login');
			return;
		}

		if(this.isGoing(this.props.user,this.state.attending)){
			let user = this.getbarAttendee(this.props.user,this.state.attending);
			deleteBarAttendee(this.props.bar.id,user._id)
			     .then((bar)=>{
						 this.removeAttendee(user,this.state.attending);
						 this.decrementGoingCounter();
					 })
					 .catch((err)=>{
						 console.log(err);
					 })
			 return
		}

		let doesBarExist = await this.barExist(this.props.bar.id);

		if(doesBarExist){
			createBarAttendee(this.props.bar.id,this.props.user.uid,this.props.user.email)
					 .then((res)=>{
						 this.addAttendee(res.data);
						 this.incrementGoingCounter();
					 })
					 .catch((err)=>{
						 console.log(err);
					 })
			return;
		}

		createNewBar(this.props.bar.id,this.props.user.uid,this.props.user.email)
				.then((res)=>{
					this.updateAttendance(res.data.attending);
					this.incrementGoingCounter()
				})
				.catch((err)=>{
					console.log(err);
				})
	}

	render() {
    return (
			<div className="bar-item">
				<img src={this.props.bar.image} alt="a local bar" className="bar-img" />
				<div className="bar-description">
					<p className="bar-name">{this.props.bar.name}</p>
					<button onClick={this.GoingToBar} className="attending">{`${this.state.goingCounter} Going`}</button>
			   </div>
      </div>
    )
  }
}

export default Baritems;
