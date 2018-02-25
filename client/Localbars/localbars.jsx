import React from 'react';
import { Header } from '../Common';
import Baritems from './baritems';
import data from '../../data';

const Localbars = (props) => {
	return (
      <div>
      	<Header user={props.user} />
		    <section className="bars">
		       <div className="container">
		       	  {data.bars.map((bar)=>{
		       	  	  return <Baritems key={bar.id} bar={bar} />
		       	   })
		       	  }
		       </div>
		    </section>
      </div>
	)
}

export default Localbars;
