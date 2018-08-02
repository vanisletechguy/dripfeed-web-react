import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/posts';
import {submitPost, getPicture} from '../actions/posts';
import Comments from './comment';
import {uploadPic} from '../actions/posts';
import {getComments} from '../actions/comments';

class Posts extends Component {
	constructor(props){
		super(props);
		this.createPost = this.createPost.bind(this);
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
	}

	createPost(){
		this.setState({newPost: true});
	}
	
	titleChange(event){
		this.setState({newTitle: event.target.value})
	}
	
	descriptionChange(event){
		this.setState({newDescription: event.target.value})
	}

	fileChangedHandler(event){
		this.setState({newPostPic: event.target.files[0]})
		this.props.uploadPic(event.target.files[0], this.props.token);
	}

	handleSubmit(event){
		event.preventDefault();
		//check props to see if pic is uploaded before submiting
		var post = {title: this.state.newTitle, 
			description: this.state.newDescription, 
			image: this.props.imageURL};
		this.props.submitPost(this.props.userId, this.props.token, post);
		this.setState({newPost: false});
	}
	
	render(){
		if(this.props.loggedIn && !this.props.loadedPosts && !this.props.loadedPosts){
			console.log('ohooo');
			this.props.getPosts(this.props.userId, this.props.token); //should call once? 
			//this.loadedPosts = true;
		}
		if(this.props.posts && this.props.posts[0] && !this.loadedComments) {
			this.props.posts.map(post => {
				///get Comments here
				this.props.getComments(this.props.userId, this.props.token, post.postid );
			});
			this.loadedComments = true;
		}
		return(
			<div className="posts">
				{
					this.state.newPost ?
						<div>
							<h3>making a new post</h3>
							<form onSubmit={this.handleSubmit}>
								<h4>Title:</h4>
								<textarea value={this.state.newTitle} 
									onChange={this.titleChange}/>
								<textarea value={this.state.newDescription} 
									onChange={this.descriptionChange}/>
								<input type="file" onChange={this.fileChangedHandler}/>
								<button action="submit">Submit</button>
							</form>
						</div>
					:
						<div></div>
				}
				{
					this.props.loggedIn ? 
						<button onClick={this.createPost}>New Post</button>	
					:
						<div></div>
				}
				{
					this.props.posts && this.props.posts[0] ?
						<div className="postGroup">
							{
								this.props.posts.map(post => {
									return(
										<div key={post.postid} className="postItem">
											{
												post &&	post.imageURI ?
													<div className="postImage well well-sm"> 
														<img src={post.imageURI}/> 
													</div>
													:
													<div></div>
											}
											<div className="well well-sm postText">
												<h4>{post.title}</h4>
												<p>{post.description}</p>
											</div>
											<div className="well well-sm comments">
												<h4>Comments</h4>
												<Comments postId={post.postid}/>
											</div>
											<p><br/></p>
										</div>
									);
								})
							}
						</div>
						:
							<p>...</p>
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
		imageURL: state.posts.imageURL
	}
}
export default connect(mapStateToProps,{getPosts,submitPost, getPicture, 
	uploadPic, getComments})(Posts);
