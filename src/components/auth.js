import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';
import {registerUser} from '../actions';
import {getPosts} from '../actions/posts';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';


class Auth extends Component {
	constructor(props) {
		super(props);
		this.classes = makeStyles(theme => ({
			root: {
				background: '#A2C1DA',
			},
			button: {
				margin: theme.spacing(1),
			},
			input: {
				display: 'none',
			},
			title: {
				flexGrow: 1,
			},
		}));

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
	}

	//tells the component to display the input objects needed to register 
	//a new user
	register(event){
		this.setState({registering: true});
	}

	//handles cancelling the registration form
	cancelRegistration(event){
		this.setState({registering: false});
	}

	//this component displays a form for the user to login with a username and 
	//password or they may click a button that will display a new registration 
	//form that the user may submit
	render(){
		return(
			<div>
				{
					!this.props.loggedIn && !this.state.registering ? 
						<div className={this.classes.root}>
								<form onSubmit={this.handleSubmit}>
									<Grid container justify = "center">
										<Typography variant="h4" className={this.classes.title}>
										Login</Typography>
									</Grid>
									<TextField type="text" className="form-control" 
										value={this.state.email} 
										onChange={this.handleEmailChange} 
										placeholder="email"/>
									<TextField type="password" className="form-control" 
										value={this.state.password} 
										onChange={this.handlePassChange} 
										placeholder="password"/>
									<div variant="contained" color="primary" 
										className={this.classes.button}>
										<Button variant="contained" color="primary" 
											type="submit">Submit</Button>
									</div>
								</form>

								<Button variant="contained" color="primary" 
									className={this.classes.button} onClick={this.register}>
									Register
								</Button>
								{
									this.props.loginAttempted ?  
										<Typography variant="h4" className={this.classes.title}>
											<div>Login Failed</div></Typography>
									: 
										<Typography variant="h4" className={this.classes.title}>
											<div></div></Typography>
								}
						</div>
					: 
						<div></div>
				}
				{
					!this.props.loggedIn && this.state.registering ?
						<form onSubmit={this.submitRegistration}>
							<Typography variant="h4" className={this.classes.title}>
							Register</Typography>
							<TextField type="text" className="form-control" 
								value={this.state.firstName} 
								onChange={this.handleFirstNameChange} 
								placeholder="First Name"/>
							<TextField type="text" className="form-control" 
								value={this.state.lastName} 
								onChange={this.handleLastNameChange} 
								placeholder="Last Name"/>
							<TextField type="password" className="form-control" 
								value={this.state.password} 
								onChange={this.handlePassChange} 
								placeholder="password"/>
							<TextField type="text" className="form-control" 
								value={this.state.email} 
								onChange={this.handleEmailChange} 
								placeholder="email address"/>
							<div className="authButtons">
								<Button type="submit">Submit</Button>
								<Button onClick={this.cancelRegistration}>Cancel</Button>
							</div>
						</form>
					: 
						<div></div>
				}
				{
					this.props.loggedIn ?
						<div className="auth">
							<Typography variant="h6" className={this.classes.title}>
							Logged In as: {this.props.email}</Typography>
						</div>
					: 
						<div></div>
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
