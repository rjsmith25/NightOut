import React, { Component } from 'react';
import axios from 'axios';

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
		console.log('attendance:', attendance)
		for(let i = 0; i < attendance.length; i++){
			if(attendance[i].uid === user.uid){
				return true;
			}
		}
		return false;
	}

	barExist(id){
		return axios.get(`http://localhost:3000/api/bar/${id}`)
				 .then((data)=>{
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
		}

		if(this.isGoing(this.props.user,this.state.attending)){
			let user = this.getbarAttendee(this.props.user,this.state.attending);
			axios.delete(`http://localhost:3000/api/bar/${this.props.bar.id}\/attendee\/${user._id}`)
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
			axios.post(`http://localhost:3000/api/bar/${this.props.bar.id}`,{
				uid: this.props.user.uid,
				name: this.props.user.email
			})
			 .then((res)=>{
				 this.addAttendee(res.data);
				 this.incrementGoingCounter();
			 })
			 .catch((err)=>{
				 console.log(err);
			 })
			 return;
		}

		axios.post('http://localhost:3000/api/bar',{
			bar_id: this.props.bar.id,
			uid: this.props.user.uid,
			name: this.props.user.email
		})
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
