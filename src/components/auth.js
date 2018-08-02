import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';
import {registerUser} from '../actions';
import {getPosts} from '../actions/posts';

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
		this.myFeed = this.myFeed.bind(this);
	}
	register(event){
		const userInfo = {
			userName: '',
			password: '',
			email: ''
		};
		this.props.registerUser(userInfo);
	}
	myFeed(event){
		this.props.getPosts(this.props.userId, this.props.token);
	}
	render(){
		if(!this.props.loggedIn){
			return(
				<div className="auth">
					<form onSubmit={this.handleSubmit}>
						<h4>Login</h4>
						<textarea value={this.state.userName} 
							onChange={this.handleUserChange}/>
						<textarea value={this.state.password} 
							onChange={this.handlePassChange}/>
						<div className="authButtons">
							<button onClick={this.register}>Register</button>
							<input type="submit" value="Submit"/>
						</div>
					</form>
				</div>
			);
		} else { // loggedIn==true
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
		email: state.auth.email,
		userId: state.auth.userId
	};
}
export default connect(mapStateToProps, {login, registerUser,getPosts} )(Auth);
