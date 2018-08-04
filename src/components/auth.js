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
			userName: '',
			password: '',
			email: ''
		};
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.submitRegistration = this.submitRegistration.bind(this);
		this.register = this.register.bind(this);
		this.myFeed = this.myFeed.bind(this);
		this.registering = false;
	}
	register(event){
		this.registering = true;
	}

	myFeed(event){
		this.props.getPosts(this.props.userId, this.props.token);
	}
	render(){
		if(!this.props.loggedIn && !this.registering){
			return(
				<div className="auth">
					<form onSubmit={this.handleSubmit}>
						<h4>Login</h4>
						<input type="text" className="form-control" value={this.state.userName} 
							onChange={this.handleUserChange} placeholder="email"/>
						<input type="password" className="form-control" value={this.state.password} 
							onChange={this.handlePassChange} placeholder="password"/>
						<div className="authButtons">
							<button onClick={this.register}>Register</button>
							<input type="submit" value="Submit"/>
						</div>
					</form>
				</div>
			);
		} else if(!this.props.loggedIn && this.registering) {
//register form

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
						</div>
					</form>



		}
		
		
		else { // loggedIn==true
			return(
				<div className="auth">
					<h4>Logged In as: {this.props.email}</h4>
					<h4 onClick={this.myFeed}>My Feed</h4>
				</div>
			);
		}
	}

	handleSubmit(event){
		const payload = 
			{userName: this.state.userName, password: this.state.password};
		this.props.login(payload);
		event.preventDefault();
	}

	submitRegistration(event){
		event.preventDefault();
		const userInfo = {
			userName: this.state.userName,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			email: this.state.email
		};
		this.props.registerUser(userInfo);
		this.registering = false;
	}

	handleUserChange(event){
		this.setState({userName: event.target.value});
	}

	handlePassChange(event){
		this.setState({password: event.target.value});
	}

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
		userId: state.auth.userId
	};
}
export default connect(mapStateToProps, {login, registerUser,getPosts} )(Auth);
