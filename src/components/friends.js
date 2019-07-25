import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../actions/friends';
import {unFriend} from '../actions/friends';
import {getPosts} from '../actions/posts';
import {clearPosts} from '../actions/posts';
import {clearComments} from '../actions/comments';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


class Friends extends Component {

	constructor(props){
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

		this.selectFriend = this.selectFriend.bind(this);
		this.removeFriend = this.removeFriend.bind(this);
		this.setDense = this.setDense.bind(this);
	}
	
	//when the user clicks a friends name, their posts should display
	selectFriend(e,friend){
		this.props.clearPosts();
		this.props.clearComments();
		this.props.getPosts(friend.iduser, this.props.token);
		console.log('clicked');
	}
	
	//remove this user from the current user's friend list
	removeFriend(friend){
		//this.props.unFriend(this.props.userId, this.props.token, friend.iduser);
	}

	setDense(){
		//return [dense, setDense] = React.useState(false);
	}

	//this component will display the current user's friend list
	//each friend can be selected to view their posts, or removed from the list
	render(){
		if(this.props.loggedIn && !this.props.loadedFriends &&this.props.token){
			this.props.getFriends(this.props.userId, this.props.token); 
		}
		//const [dense, setDense] = this.setDense();
		return(
			<div className={this.classes.root}>
				<Typography variant="h4" className={this.classes.title}>
					Friend List</Typography>
					{
						this.props.loadedFriends ?
							<div>
								<List>
									{
										this.props.friends.map(friend => {
											
											const fullName = friend.firstName + ' ' + friend.lastName;
											return(
												<ListItem button onClick={e => this.selectFriend(e,friend)}>
													<ListItemText
														primary={fullName}/>
												</ListItem>
											);
										})		
									}
								</List>
							</div>
						:
							<p></p>
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
