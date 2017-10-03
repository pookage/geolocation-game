import React from 'react';
import PropTypes from 'prop-types';
import utils from 'utils.js';
import Home from "components/Home/Home.jsx";

export default class LoggedIn extends React.Component {

	constructor(){
		super();

		//function binding
		this.addListeners    = this.addListeners.bind(this);
		this.removeListeners = this.removeListeners.bind(this);
		this.logOutUser      = this.logOutUser.bind(this);
		this.handleError     = this.handleError.bind(this);
	}//constructor

	//LIFECYCLE METHODS
	//----------------------------
	componentDidMount(){
		this.addListeners();
	}//componentDidMount
	componentWillUnmount(){
		this.removeListeners();
	}//componentWillUnmount


	//EVENT LISTENERS
	//------------------------------
	addListeners(){
		this.$logoutButton.addEventListener("click", this.logOutUser);
	}//addListeners
	removeListeners(){
		this.$logoutButton.removeEventListener("click", this.logOutUser);
	}//removeListeners

	//CLASS METHDOS
	//------------------------------
	logOutUser(){
		try {

			const { username, logoutSuccess } = this.props;
			const userToLogOut                = username;
			const logOutResponse              = utils.localstorage.clearCurrentUser();

			if(logOutResponse.outcome == "SUCCESS"){
				console.log("woop!");
				logoutSuccess();
			} else throw logOutResponse;

		} catch(error){
			this.handleError(error);
		}
	}//logOutUser
	handleError(error){
		console.log("errror : ", error)
		this.setState({
			error: error.message
		});
	}//handleError


	//RENDER METHDOS
	//----------------------------
	render(){

		const { username } = this.props;

		return(
			<div>
				<button ref={button => this.$logoutButton = button}>
					Log Out
				</button>
				<Home username={username} />
			</div>
		);
	}//render

}

LoggedIn.propTypes = {
	username: PropTypes.string.isRequired,
	logoutSuccess: PropTypes.func.isRequired
}