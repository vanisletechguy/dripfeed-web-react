import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../actions/friends';
//import {removeFriend} from '../actions';

class Friends extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		if(this.props.loggedIn && !this.props.loadedFriends &&this.props.token){
			console.log('getting friends with:', this.props.token);
			this.props.getFriends(this.props.userId, this.props.token); //userid and token 
		}
		return(
			<div className="friends">
				<h3>Friend List</h3>
					{
						this.props.loadedFriends ?
							<div>
							<ul>
								{
									this.props.friends.map(friend => {
										return(
											<li key={friend.iduser}>
												{friend.firstName}	{friend.lastName} 
											</li>
										);
									})		
								}
							</ul>
							
							</div>
						:
							<p>...</p>
					}	
			</div>		
		);
	}
}

function mapStateToProps(state){
	console.log('friends state is', state);
	if(!state.auth.loggedIn){return {loggedIn: false};}
	return {
		loggedIn: state.auth.loggedIn,
		userId: state.auth.userId,
		token: state.auth.token,
		friends: state.friends.friends,
		loadedFriends: state.friends.loadedFriends
	};
}

export default connect(mapStateToProps, {getFriends})(Friends);
