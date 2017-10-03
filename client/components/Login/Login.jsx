import React from 'react';
import PropTypes from 'prop-types';
import utils from 'utils.js';

export default class Login extends React.Component {

	constructor(){
		super();

		this.addListeners    = this.addListeners.bind(this);
		this.removeListeners = this.removeListeners.bind(this);
		this.handleSubmit    = this.handleSubmit.bind(this);
		this.logInUser       = this.logInUser.bind(this);
		this.handleError     = this.handleError.bind(this);
	}//constructor

	//LIFECYCLE METHODS
	//------------------------------------
	componentDidMount(){
		this.addListeners();
	}//componentDidMount
	componentWillUnmount(){
		this.removeListeners();
	}//componentWillUnmount

	//EVENT HANDLERS
	//-----------------------------------
	addListeners(){
		this.$form.addEventListener("submit", this.handleSubmit)
	}//addListeners
	removeListeners(){
		this.$form.removeEventListener("submit", this.handleSubmit)
	}//removeListeners
	handleSubmit(event){
		event.preventDefault();
		
		const inputEl  = event.target[0];
		const username = inputEl.value;
		
		if(!!username){
			this.logInUser(username);
		} else {
			this.handleError({
				message: "input must have a value"
			});
		}
	}//handleSubmit


	//CLASS METHODS
	//------------------------------------
	logInUser(username){
		try {
			const setUserResponse = utils.localstorage.setCurrentUser(username);
			if(setUserResponse.outcome == "SUCCESS"){
				this.props.loginSuccess(username);
			} else throw setUserResponse;
		} catch(error){
			this.handleError(error);
		}
	}//logInUser
	handleError(error){
		this.setState({
			error: error.message
		});
	}//handleError



	//RENDER METHODS
	//-----------------------------------
	render(){
		return(
			<form ref={form => this.$form = form}>
				<h1>
					Login
				</h1>
				<input type="text" placeholder="username"/>
				<input type="submit" value="Log In" />
			</form>
		);
	}//render

}

Login.propTypes = {
	loginSuccess: PropTypes.func.isRequired
};