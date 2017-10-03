import React from 'react';
import PropTypes from 'prop-types';
import utils from 'utils.js';

export default class Home extends React.Component {


	//RENDER METHDOS
	//----------------------------
	render(){

		const { username } = this.props;

		return(
			<div>
				<h1>
					Logged in {username}
				</h1>
			</div>
		);
	}//render

}

Home.propTypes = {
	username: PropTypes.string.isRequired
}