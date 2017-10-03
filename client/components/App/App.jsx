import React from 'react';
import Login from "components/Login/Login.jsx";
import Home from "components/Home/Home.jsx";
import utils from 'utils.js';

export default class App extends React.Component {

	constructor(){

		super();
		this.state          = {};
		this.state.loggedIn = false;

		//function binding
		//-----------------------------------
		this.login            = this.login.bind(this);
		this.checkCurrentUser = this.checkCurrentUser.bind(this);
		this.handleError      = this.handleError.bind(this);

	}//constructor

	componentDidMount(){

		this.checkCurrentUser();

	}//componentDidMount

	//UTILITY METHODS
	//------------------------------------
	checkCurrentUser(){
		try {
			const response = utils.localstorage.requestCurrentUser();
			if(response.outcome == "SUCCESS"){
				const currentUser = response.data;
				this.login(currentUser)
			} else throw response;
		} catch(error) {
			this.handleError(error);
		}
	}//checkCurrentUser
	login(username){
		this.setState({
			loggedIn: true,
			username
		});
	}//login
	handleError(error){
		console.log("ERROR: ", error);
		this.setState({
			error: error.message
		});
	}//handleError


	//RENDER METHODS
	//-------------------------------------
	render() {

		const loggedIn = this.state.loggedIn;

		if(loggedIn){
			return(
				<Home username={this.state.username} />
			);
		} else {
			return(
				<Login loginSuccess={this.login}/>
			)
		}
	}//render


}
