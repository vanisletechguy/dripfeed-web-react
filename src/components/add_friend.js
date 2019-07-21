import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchForUser} from '../actions/friends';
import {addFriend} from '../actions/friends';

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
		this.addToFriends = this.addToFriends.bind(this);
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
		this.props.searchForUser(this.props.userId, this.props.token, 
		this.state.firstName, this.state.lastName);
		event.preventDefault();
	}

	resultIsFriend(user){
		var isFriend = false;	
		if(this.props.friendsList){
			this.props.friendsList.map(friend => {
				if (friend.iduser === user.iduser) isFriend = true; 
			})
		}
		return isFriend;
	}

	addToFriends(event, newFriend){
		const friendId = newFriend.iduser;
		this.props.addFriend(this.props.userId, this.props.token, friendId);
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
								<input type="text" className="form-control" 
									value={this.state.firstName} 
									onChange={this.handleFirstNameChanged} 
									placeholder="first name"/>	
								<input type="text" className="form-control" 
									value={this.state.lastName} 
									onChange={this.handleLastNameChanged} 
									placeholder="last name"/>	
								<input type="submit" value="Search"/>
							</form>
						{
							this.props.newFriend ?
								<div className="well well-sm">
									<h4>Search Result</h4>
									<div>
										{this.props.newFriend.firstName}
										{this.props.newFriend.lastName}
									{
										this.resultIsFriend(this.props.newFriend) ?
											<div className="searchResult">
												<div>FRIENDS</div>
											</div>
										:
											<div className="searchResult">
												<div onClick={(e) => 
													this.addToFriends(e,this.props.newFriend)}>ADD</div>
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

export default connect(mapStateToProps, {searchForUser, addFriend})(AddFriend);

