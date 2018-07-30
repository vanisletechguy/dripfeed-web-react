import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';
import {registerUser} from '../actions';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		};
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.register = this.register.bind(this);
	}
	register(event){
		const userInfo = {
			userName: '',
			password: '',
			email: ''
		};
		this.props.registerUser(userInfo);
	}
	render(){
		if(!this.props.loggedIn){
			return(
				<div className="auth">
					<button onClick={this.register}>Register</button>
					<form onSubmit={this.handleSubmit}>
						<h4>Login</h4>
						<textarea value={this.state.userName} onChange={this.handleUserChange}/>
						<textarea value={this.state.password} onChange={this.handlePassChange}/>
						<input type="submit" value="Submit"/>
					</form>
				</div>
			);
		} else { // loggedIn==true
			return(
				<div className="auth">
					<h4>Logged In as: {this.props.email}</h4>
				</div>
			);
		}
	}

	handleSubmit(event){
		const payload = {userName: this.state.userName, password: this.state.password};
		this.props.login(payload);
		event.preventDefault();
	}

	handleUserChange(event){
		this.setState({userName: event.target.value});
	}

	handlePassChange(event){
		this.setState({password: event.target.value});
	}
}
function mapStateToProps(state){
	if(!state){return {token: ''}}
	if(!state.auth.token) {return {token: ''}}
	return{
		token: state.auth.token,
		loggedIn: state.auth.loggedIn,
		email: state.auth.email
	};
}
export default connect(mapStateToProps, {login, registerUser} )(Auth);
