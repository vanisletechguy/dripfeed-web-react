import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/posts';
import {submitPost, getPicture} from '../actions/posts';
import Comments from './comment';
import {uploadPic} from '../actions/posts';
import {getComments} from '../actions/comments';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Posts extends Component {
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

		this.createPost = this.createPost.bind(this);
		this.cancelNewPost = this.cancelNewPost.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.descriptionChange = this.descriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.state = {newPost: false};
		this.state.newTitle = '';
		this.state.newDescription = '';
		this.state.newPostPic;
		this.state.newPicSignedURL = '';
		this.loadedPosts = false;
		this.viewingUser = 0;
	}

	//tell the component to display the objects needed to create a new post
	createPost(e){
		this.setState({newPost: true});
	}

	cancelNewPost(e){
		this.setState({newPost: false});
	}

	//handles changes to the new post's title
	titleChange(event){
		this.setState({newTitle: event.target.value})
	}

	//handles changes to the new post's description
	descriptionChange(event){
		this.setState({newDescription: event.target.value})
	}

	//handle changes to the choosen image file
	fileChangedHandler(event){
		this.setState({newPostPic: event.target.files[0]})
		this.props.uploadPic(event.target.files[0], this.props.token);
	}

	//handles when the user submits a new post
	handleSubmit(event){
		event.preventDefault();
		if(!this.props.imageURL) return; //show no img error
		var post = {title: this.state.newTitle, 
			description: this.state.newDescription, 
			image: this.props.imageURL};
		this.props.submitPost(this.props.userId, this.props.token, post);
		this.setState({newPost: false});
	}

	//this component will conditionally display the posts loaded into state which 
	//could either be a) the current users posts b) a selected friends posts c) a 
	//feed of friends posts this component will also display a form for creating 
	//a new comment
	render(){
		if(this.props.loggedIn && !this.props.loadedPosts && 
			!this.props.loadedPosts){
			this.props.getPosts(this.props.userId, this.props.token); 
			this.loadedPosts = true;
		}
		return(
			<div className="posts">
				{
					this.props.loggedIn && !this.state.newPost? 
						<Card>
							<CardContent>
								<div className="postItem">
									<br/>
									<div className="">
										<Typography variant="h6" className={this.classes.title}>
											Share something special with your friends!</Typography>

										<Button variant="contained" color="primary" onClick={e => 
											this.createPost(e)}>New Post</Button>	
									</div>
									<br/>
								</div>
							</CardContent>
						</Card>
					:
						<div></div>
				}
				{
					this.state.newPost ?
						<Card>
							<CardContent>
								<div className="postItem">
									<br/>
									<div className="newPostWrapper">
										<Typography variant="h4" className={this.classes.title}>
											New Post</Typography>
										<form onSubmit={this.handleSubmit}>
											<TextField type="text" className="" 
												value={this.state.newTitle} 
												variant="filled" fullWidth
												onChange={this.titleChange} placeholder="Post Title"/>
											<TextField type="text" value={this.state.newDescription} 
												variant="filled" fullWidth
												onChange={this.descriptionChange} placeholder="Text" 
												multiline={true}	rowsMax="4"	className=""/>
											<br/>
											<Input type="file" onChange={this.fileChangedHandler}/>
											<br/>
											<Button variant="contained" color="primary" 
												onClick={e => this.cancelNewPost()}>Cancel</Button>
											{'    '}
											<Button variant="contained" color="primary" type="submit">
												Submit</Button>
										</form>
									</div>
									<br/>
								</div>
							</CardContent>	
						</Card>

					:
						<span></span>
				}
				{
					this.props.posts && this.props.posts[0] ?
						<div className="postGroup">
							{
								this.props.posts.map(post => {
									return(
										<Card raised='true'>
											<CardContent>
												<div key={post.postid} className="postItem">
													{
														post &&	post.imageURI ?
															<div className="postImage"> 
																<img src={post.imageURI}/> 
															</div>
															:
															<div></div>
													}
													<div className="postText">
														<Typography variant="h4" className={this.classes.title}>
														{post.title}</Typography>
														<Typography variant="h6" className={this.classes.title}>
															<p>{post.description}</p></Typography>
													</div>
													<div className="comments">
														<Grid container justify = "center">
															<Typography variant="h4" className={this.classes.title}>
															Comments</Typography>
														</Grid>
														<Comments postId={post.postid}/>
													</div>
													<p><br/></p>
												</div>
											</CardContent>
										</Card>
									);
								})
							}
						</div>
						:
							<div className="noPosts"></div>
				}
			</div>
		);
	}	
}

function mapStateToProps(state){
	if(!state.auth && !state.posts.posts && !state.posts.loadedPosts && 
		!state.auth.token){
		return {loggedIn: false, loadedPosts: false};}
	return {
		loggedIn: state.auth.loggedIn,
		userId: state.auth.userId,
		posts: state.posts.posts,
		loadedPosts: state.posts.loadedPosts,
		postSubmitSuccess: state.posts.postSubmitSuccess,
		token: state.auth.token,
		picUpload: state.posts.picUpload,
		imageURL: state.posts.imageURL,
		loadedComments: state.comments.loadedComments
	}
}
export default connect(mapStateToProps,{getPosts,submitPost, getPicture, 
	uploadPic, getComments})(Posts);
