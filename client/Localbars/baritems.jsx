import React from 'react';

const Baritems = (props) => {
	return (
  	  <div className="bar-item">
				<img src={props.bar.image} alt="a local bar" className="bar-img" />
				<div className="bar-description">
					<p className="bar-name">{props.bar.name}</p>
					<button className="attending">{`${props.bar.attendance.length} Going`}</button>
			   </div>
      </div>
	)
}

export default Baritems;
