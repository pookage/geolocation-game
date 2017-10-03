import React from 'react';
import Login from "components/Login/Login.jsx";
import LoggedIn from "components/LoggedIn/LoggedIn.jsx";
import utils from 'utils.js';

export default class App extends React.Component {

	constructor(){

		super();
		this.state          = {};
		this.state.loggedIn = false;
		this.state.username = "";

		//function binding
		//-----------------------------------
		this.login            = this.login.bind(this);
		this.logout           = this.logout.bind(this);
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
	logout(){
		this.setState({
			loggedIn: false,
			username: ""
		})
	}//logout
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
				<LoggedIn 
					username={this.state.username}
					logoutSuccess={this.logout}
				/>
			);
		} else {
			return(
				<Login loginSuccess={this.login}/>
			)
		}
	}//render


}
