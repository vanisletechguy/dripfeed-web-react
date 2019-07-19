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

	myPosts(event){
		this.props.clearPosts();
		this.props.clearComments();
		this.props.getPosts(this.props.userId, this.props.token);
	}

	myFeed(event){

	}

	myProfile(event){
		
	}
	

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
