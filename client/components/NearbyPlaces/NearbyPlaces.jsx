import React from 'react';
import PropTypes from 'prop-types';
import utils from 'utils.js';

export default class NearbyPlaces extends React.Component {

	constructor(){
		super();

		//function binding
		this.findUser         = this.findUser.bind(this);
		this.findNearbyPlaces = this.findNearbyPlaces.bind(this);
		this.handleError      = this.handleError.bind(this);
	}//constructor

	//LIFECYCLE METHODS
	//------------------------------
	async componentDidMount(){

		const userLocation = await this.findUser();
		const nearbyPlaces = await this.findNearbyPlaces(userLocation);
		console.log(nearbyPlaces);

	}//componentDidMount


	//CLASS METHODS
	//------------------------------
	async findUser(){
		
		try {
			const geolocationResponse = await utils.geolocation.getUserLocation();
			if(geolocationResponse.outcome == "SUCCESS"){
				return geolocationResponse.data;
			} else throw geolocationResponse;
		} catch(error){
			this.handleError(error)
		}
	}//findUser
	async findNearbyPlaces(location){
		return "monkey";
	}//findNearbyPlaces
	handleError(error){
		this.setState({
			error: error.message
		});
	}//handleError


	//RENDER METHODS
	//------------------------------
	render(){
		return(
			<span>loading places...</span>
		);
	}//render

}

NearbyPlaces.propTypes = {};