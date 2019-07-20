import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/posts';
import {clearComments} from '../actions/comments';
import {clearPosts} from '../actions/posts';

class Navigation extends Component {
	constructor(props){
		super(props);
		this.myFeed = this.myFeed.bind(this);
		this.myPosts = this.myPosts.bind(this);
		this.myProfile = this.myProfile.bind(this);
	}

	//show the user his own posts
	myPosts(event){
		this.props.clearPosts();
		this.props.clearComments();
		this.props.getPosts(this.props.userId, this.props.token);
	}

	//personallized feed of posts from the users friends
	myFeed(event){

	}

	//the the user his own profile
	myProfile(event){
		
	}
	
	//Renders the navigation sections which contains 2 buttons
	//one will show the user his own posts, the other will show the user his feed
	render() {
		return(
			<div className="navigation">
				<h3>Navigation</h3>
				<div className="friendListItem">
					<div onClick={this.myFeed()}>
						[My Feed]	
						<div onClick={(e) => {this.myPosts()}} 
							className="removeFriend">[My Posts]
						</div>
					</div> 
				</div>
			</div>

		);
	}
}
function mapStateToProps(state){
	if(!state.auth.loggedIn){return {loggedIn: false};}
	return{
		loggedIn: state.auth.loggedIn,
		userId: state.auth.userId,
		token: state.auth.token
	};
}
export default connect(mapStateToProps, {getPosts, clearPosts, clearComments})(Navigation);
