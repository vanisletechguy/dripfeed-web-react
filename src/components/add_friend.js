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
		this.resultIsFriend = this.resultIsFriend.bind(this);
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

	resultIsFriend(user){
		var isFriend = false;	
		this.props.friendsList.map(friend => {
			if (friend.userId === user.userId) isFriend = true; 
		})
		return isFriend;
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
									<div >{this.props.newFriend.firstName}{this.props.newFriend.lastName}
									{
										//if newFriend is already friend show Friends instead of Add
										this.resultIsFriend(this.props.newFriend) ?
											<div className="searchResult">
												<div>FRIENDS</div>
											</div>
										:
											<div className="searchResult">
												<div>ADD</div>
											</div>
									}								
										</div>
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
		newFriend: state.friends.newFriend,
		friendsList: state.friends.friends
	}
}

export default connect(mapStateToProps, {searchForUser})(AddFriend);

