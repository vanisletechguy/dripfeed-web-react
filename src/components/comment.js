import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions/comments';
import {submitComment} from '../actions/comments';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


class Comments extends Component{
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

		this.makeComment = this.makeComment.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.state = {makingComment: false, newComment: '', 
			loadedComments: false };
		this.submitComment = this.submitComment.bind(this);
		this.cancelMakeComment = this.cancelMakeComment.bind(this);
		this.commentChanged = this.commentChanged.bind(this);
		this.state.comments = [];
		this.submitedNewComment = false;
	}

	//tell the component to display the form for creating a new comment
	makeComment(e){
		this.setState({makingComment: true});
	}

	cancelMakeComment(e){
		this.setState({makingComment: false});
	}

	//handles changes to the new comment text area
	commentChanged(event){
		this.setState({newComment: event.target.value})
	}

	//handles submitting a new comment
	submitComment(event){
		event.preventDefault();
		this._asyncRequest = this.props.submitComment(this.props.userId,
			this.props.token,	this.props.postId, this.state.newComment).then(
				data => {
					this._asyncRequest = null; 
					this.setState({makingComment: false});
					this.fetchComments();
				});
	}

	fetchComments(){
		this.state.loadedComments = false;
		this._asyncRequest = this.props.getComments(
			this.props.userId, this.props.token, this.props.postId).then(
				data => {
					this._asyncRequest = null;	
				this.setState({loadedComments: true});
				this.setState({comments: data.comments});
		});
	}

	componentDidMount(){
		this.fetchComments();
	}

	//this component will render a post's comments and give the current user the 
	//option to create a new comment
	render(){
		return(
			<div>
				<List>
					{
						this.state.loadedComments && this.state.comments && 
							this.state.comments[0] ?
							this.state.comments.map(comment => {
									if(comment.postid === this.props.postId){
										return (
											<div className="well well-sm" key={comment.commentid}>
												<ListItem>
													<Typography variant="h6" 
														className={this.classes.title}>
														<ListItemText primary={comment.userid}/>
														<ListItemText primary={comment.text}/>
													</Typography>
												</ListItem>
											</div>
										);
									}
								})
						:
							<p></p>
					}
				</List>
				{
					this.state.makingComment ?
						<div>
							<Typography variant="h4" className={this.classes.title}>
								Submit Your Comment</Typography>
							<form onSubmit={this.submitComment}>
								<TextField value={this.state.newComment} 
									variant="filled" fullWidth
									onChange={this.commentChanged} className=""/>
								<Button variant="contained" color="primary" 
									onClick={e => this.cancelMakeComment()}>Cancel</Button>
								{'    '}
								<Button variant="contained" color="primary" type="submit">
									Submit</Button>
							</form>
						</div>
					:
						<div>
							<Button variant="contained" color="primary" onClick={e => 
								this.makeComment(e)}>New Comment</Button>	
						</div>
				}
			</div>
		);
	}

	componentWillReceiveProps(nextProps, nextState){
		this.setState({
			postId: nextProps["postid"]
		});
	}
}

function mapStateToProps(state){
	return {
		userId: 		state.auth.userId,
		token: 			state.auth.token,
		comments: 	state.comments.comments,
		loadedComments: state.comments.loadedComments
	};	
}

export default connect(mapStateToProps, {getComments, submitComment})(Comments);
