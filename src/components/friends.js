import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../actions/friends';
//import {removeFriend} from '../actions';
import {getPosts} from '../actions/posts';
import {clearPosts} from '../actions/posts';
import {clearComments} from '../actions/comments';

class Friends extends Component {
	constructor(props){
		super(props);
		this.selectFriend = this.selectFriend.bind(this);
	}
	
	selectFriend(event, friend){
		console.log('u clicked on id:', friend.iduser);
		this.props.clearPosts();
		this.props.clearComments();
		this.props.getPosts(friend.iduser, this.props.token);
	}
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
								<ul>
									{
										this.props.friends.map(friend => {
											return(
												<li key={friend.iduser} onClick={(e) => this.selectFriend(e, friend)}>
													<div>
														{friend.firstName}	{friend.lastName} 
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

export default connect(mapStateToProps, {getFriends, getPosts, clearPosts, clearComments})(Friends);
