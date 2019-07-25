import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchForUser} from '../actions/friends';
import {addFriend} from '../actions/friends';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'


class AddFriend extends Component {
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

		this.state = {
			firstName: '',
			lastName: '',
			addingFriend: false
		}
		this.addFriend = this.addFriend.bind(this);
		this.cancelAddFriend = this.cancelAddFriend.bind(this);
		this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
		this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
		this.searchFriend = this.searchFriend.bind(this);
		this.resultIsFriend = this.resultIsFriend.bind(this);
		this.addToFriends = this.addToFriends.bind(this);
	}

	addFriend(e){
		this.setState({addingFriend: true});
	}

	cancelAddFriend(e){
		this.setState({addingFriend: false});
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
					<Button variant="contained" color="primary" 
						onClick={this.addFriend}>Add friends</Button>
					{
					this.state.addingFriend ?
						<div>
							<form onSubmit={this.searchFriend}>
								<TextField type="text" className="form-control" 
									value={this.state.firstName} 
									onChange={this.handleFirstNameChanged} 
									placeholder="first name"/>	
								<TextField type="text" className="form-control" 
									value={this.state.lastName} 
									onChange={this.handleLastNameChanged} 
									placeholder="last name"/>	
								<Button variant="contained" color="primary" type="submit">
									Submit</Button>
								<Button variant="contained" color="primary" 
									onClick={e => this.cancelAddFriend()}>Cancel</Button>
							</form>
						{
							this.props.newFriend ?
								<div className="well well-sm">
									<Typography variant="h4" className={this.classes.title}>
									Search Result</Typography>
									<Typography variant="h6" className={this.classes.title}>
									<div>
										{this.props.newFriend.firstName}
										{this.props.newFriend.lastName}
									{
										this.resultIsFriend(this.props.newFriend) ?
											<div>
												<Button variant="contained" color="primary">
													Friends</Button>
											</div>
										:
											<div>
												<Button variant="contained" color="primary" 
													onClick={(e) => this.addToFriends(e,
														this.props.newFriend)}>ADD</Button>
											</div>
									}								
									</div>
									</Typography>
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

