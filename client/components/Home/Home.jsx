import React from 'react';
import PropTypes from 'prop-types';
import NearbyPlaces from "components/NearbyPlaces/NearbyPlaces.jsx";

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
				<NearbyPlaces />
			</div>
		);
	}//render

}

Home.propTypes = {
	username: PropTypes.string.isRequired
}