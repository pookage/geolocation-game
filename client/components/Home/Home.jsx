import React from 'react';
import PropTypes from 'prop-types';
import utils from 'utils.js';

export default class Home extends React.Component {


	//RENDER METHDOS
	//----------------------------
	render(){
		return(
			<div>
				<h1>
					Logged in {this.props.username}
				</h1>
				<button>
					Log Out
				</button>
			</div>
		);
	}//render

}

Home.propTypes = {
	username: PropTypes.string.isRequired
}