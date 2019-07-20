import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';
import {registerUser} from '../actions';
import {getPosts} from '../actions/posts';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			password: '',
			email: '',
			registering: false
		};
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.submitRegistration = this.submitRegistration.bind(this);
		this.cancelRegistration = this.cancelRegistration.bind(this);
		this.register = this.register.bind(this);
		this.myFeed = this.myFeed.bind(this);
	}

	//tells the component to display the input objects needed to register a new user
	register(event){
		this.setState({registering: true});
	}

	//show the current user a personalized feed constructed by the server
	myFeed(event){
		event.preventDefault();
		this.props.getPosts(this.props.userId, this.props.token);
	}

	//handles cancelling the registration form
	cancelRegistration(event){
		this.setState({registering: false});
	}

	//this component displays a form for the user to login with a username and password
	//or they may click a button that will display a new registration form that the user may submit
	render(){
		return(
			<div>
				{
				!this.props.loggedIn && !this.state.registering ? 
					<div className="auth">
							<form onSubmit={this.handleSubmit}>
								<h4>Login</h4>
								<input type="text" className="form-control" value={this.state.email} 
									onChange={this.handleEmailChange} placeholder="email"/>
								<input type="password" className="form-control" value={this.state.password} 
									onChange={this.handlePassChange} placeholder="password"/>
								<div className="authButtons">
									<input type="submit" value="Submit"/>
								</div>
							</form>

							<button onClick={this.register}>Register</button>
							{
								this.props.loginAttempted ?  <div>Login Failed</div> : <div>not tried yet</div>
							}
						</div>
				: <div></div>
				}
				{
				!this.props.loggedIn && this.state.registering ?
					<form onSubmit={this.submitRegistration}>
						<h4>Register</h4>
						<input type="text" className="form-control" value={this.state.firstName} 
							onChange={this.handleFirstNameChange} placeholder="First Name"/>
						<input type="text" className="form-control" value={this.state.lastName} 
							onChange={this.handleLastNameChange} placeholder="Last Name"/>
						<input type="password" className="form-control" value={this.state.password} 
							onChange={this.handlePassChange} placeholder="password"/>
						<input type="text" className="form-control" value={this.state.email} 
							onChange={this.handleEmailChange} placeholder="email address"/>
						<div className="authButtons">
							<input type="submit" value="Submit"/>
							<button onClick={this.cancelRegistration}>Cancel</button>
						</div>
					</form>
				: <div></div>
				}
				{
					this.props.loggedIn ?
						<div className="auth">
							<h4>Logged In as: {this.props.email}</h4>
							<h4 onClick={this.myFeed}>My Feed</h4>
						</div>
					: <div></div>
				}
			</div>
		)
	}

	//called when the user clicks submit on the login form
	handleSubmit(event){
		event.preventDefault();
		const payload = 
			{email: this.state.email, password: this.state.password};
		this.props.login(payload);
	}

	//called when the user clicks submit on the registration form
	submitRegistration(event){
		event.preventDefault();
		const userInfo = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			email: this.state.email
		};
		this.props.registerUser(userInfo);
		this.setState({registering: false});
	}


	//handles changing the text value of the password field	
	handlePassChange(event){
		this.setState({password: event.target.value});
	}

	//handles changing the text value of the first name field	
	handleFirstNameChange(event){
		this.setState({firstName: event.target.value});
	}


	//handles changing the text value of the last name field	
	handleLastNameChange(event){
		this.setState({lastName: event.target.value});
	}

	//handles changing the text value of the email field	
	handleEmailChange(event){
		this.setState({email: event.target.value});
	}
}
function mapStateToProps(state){
	if(!state){return {token: ''}}
	if(!state.auth.token) {return {token: ''}}
	return{
		token: state.auth.token,
		loggedIn: state.auth.loggedIn,
		email: state.auth.email,
		userId: state.auth.userId,
		loginAttempted: state.auth.attempt
	};
}
export default connect(mapStateToProps, {login, registerUser,getPosts} )(Auth);
