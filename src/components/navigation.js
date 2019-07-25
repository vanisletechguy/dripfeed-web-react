import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {getPosts} from '../actions/posts';
import {clearComments} from '../actions/comments';
import {clearPosts} from '../actions/posts';

class Navigation extends Component {
	constructor(props){
		super(props);
		this.myFeed = this.myFeed.bind(this);
		this.myPosts = this.myPosts.bind(this);
		this.myProfile = this.myProfile.bind(this);

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
		}));
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
				<Typography variant="h4" className={this.classes.title}>
				Navigation</Typography>
				<div className="friendListItem">
					<Button onClick={e => this.myFeed(e)}>
						My Feed</Button>	
					<Button onClick={e => this.myPosts(e)} 
						>My Posts</Button>
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
export default connect(mapStateToProps, {getPosts, clearPosts, 
	clearComments})(Navigation);
