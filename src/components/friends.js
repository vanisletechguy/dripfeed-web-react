import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../actions/friends';
import {unFriend} from '../actions/friends';
import {getPosts} from '../actions/posts';
import {clearPosts} from '../actions/posts';
import {clearComments} from '../actions/comments';

class Friends extends Component {
	constructor(props){
		super(props);
		this.selectFriend = this.selectFriend.bind(this);
		this.removeFriend = this.removeFriend.bind(this);
	}
	
	//when the user clicks a friends name, their posts should display
	selectFriend(event, friend){
		this.props.clearPosts();
		this.props.clearComments();
		this.props.getPosts(friend.iduser, this.props.token);
	}
	
	//remove this user from the current user's friend list
	removeFriend(event, friend){
		this.props.unFriend(this.props.userId, this.props.token, friend.iduser)
	}

	//this component will display the current user's friend list
	//each friend can be selected to view their posts, or removed from the list
	render(){
		if(this.props.loggedIn && !this.props.loadedFriends &&this.props.token){
			this.props.getFriends(this.props.userId, this.props.token); 
		}
		return(
			<div className="friends">
				<h3>Friend List</h3>
					{
						this.props.loadedFriends ?
							<div>
								<ul className="list-unstyled">
									{
										this.props.friends.map(friend => {
											return(
												<li key={friend.iduser} >
													<div className="friendListItem">
														<div onClick={(e) => this.selectFriend(e, friend)}>
															{friend.firstName}	{friend.lastName}
															<div onClick={(e) => {this.removeFriend(
																e, friend)}} className="removeFriend">[Remove]
															</div>
														</div> 
													</div>
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
	if(!state.auth.loggedIn){return {loggedIn: false};}
	return {
		loggedIn: state.auth.loggedIn,
		userId: state.auth.userId,
		token: state.auth.token,
		friends: state.friends.friends,
		loadedFriends: state.friends.loadedFriends
	};
}

export default connect(mapStateToProps, {getFriends, getPosts, clearPosts, 
	clearComments, unFriend})(Friends);
