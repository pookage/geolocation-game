import React from 'react';
import Login from "components/Login/Login.jsx"
import utils from 'utils.js';

export default class App extends React.Component {

	constructor(){

		super();
		this.state          = {};
		this.state.loggedIn = false;

		//function binding
		//-----------------------------------
		this.login = this.login.bind(this);

	}//constructor

	componentDidMount(){

		const currentUser = utils.localstorage.getCurrentUser();

		

		if(!!currentUser){
			this.login(currentUser);
		} else {
			//SHOW LOGIN SCREEN
		}

	}//componentDidMount

	//UTILITY METHODS
	//------------------------------------
	login(user){

		console.log("log in : ", user);

	}//login


	//RENDER METHODS
	//-------------------------------------
	render() {

		const loggedIn = this.state.loggedIn;

		return (
			<Login />
		);
	}//render


}
