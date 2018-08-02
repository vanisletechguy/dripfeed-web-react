import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchForUser} from '../actions/friends';
//import {addFriend} from '../actions/friends';

class AddFriend extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			addingFriend: false
		}
		this.addFriend = this.addFriend.bind(this);
		this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
		this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
		this.searchFriend = this.searchFriend.bind(this);
	}
	addFriend(event){
		this.setState({addingFriend: true});
	}

	handleFirstNameChanged(event){
		this.setState({firstName: event.target.value});
	}

	handleLastNameChanged(event){
		this.setState({lastName: event.target.value});
	}
	
	searchFriend(event){
		console.log('searching friend:', this.state.firstName);
		this.props.searchForUser(this.props.userId, this.props.token, this.state.firstName, this.state.lastName);
		event.preventDefault();
	}
	render(){
		if(this.props.loggedIn && this.props.token){
			return(
				<div>
					<button onClick={this.addFriend}>Add a friend</button>
					{
					this.state.addingFriend ?
						<div>
							<form onSubmit={this.searchFriend}>
								<textarea value={this.state.firstName} onChange={this.handleFirstNameChanged}/>	
								<textarea value={this.state.lastName} onChange={this.handleLastNameChanged}/>	
								<input type="submit" value="Search"/>
							</form>
						{
							this.props.newFriend ?
								<div>
									<h4>Search Result</h4>
									<p>{this.props.newFriend.firstName}{this.props.newFriend.lastName}</p>
								</div>
							:
								<div></div>
						}
						</div>
					:
						<div></div>
					}
				</div>
			);
		} else {
			return(
				<div></div>
			);
		}
	}
}

function mapStateToProps(state){
	if(!state.auth.loggedIn){return {loggedIn: false};}
	return {
		loggedIn: state.auth.loggedIn,
		token: state.auth.token,
		userId: state.auth.userId,
		newFriend: state.friends.newFriend
	}
}

export default connect(mapStateToProps, {searchForUser})(AddFriend);
