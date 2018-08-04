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
		this.viewingUser = 0;
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
		if(!this.props.imageURL) return; //show no img error
		var post = {title: this.state.newTitle, 
			description: this.state.newDescription, 
			image: this.props.imageURL};
		this.props.submitPost(this.props.userId, this.props.token, post);
		this.setState({newPost: false});
	}
	
	render(){
		if(this.props.loggedIn && !this.props.loadedPosts && !this.props.loadedPosts){
			//this.props.viewingUser instead
			this.props.getPosts(this.props.userId, this.props.token); //should call once? 
			//this.loadedPosts = true;
		}
		if(this.props.posts && this.props.posts[0] && !this.props.loadedComments) {//should call once? 
			this.props.posts.map(post => {
				this.props.getComments(this.props.userId, this.props.token, post.postid );
			});
			this.loadedComments = true;
		}
		return(
			<div className="posts">
				{
					this.props.loggedIn && !this.state.newPost? 
						<button onClick={this.createPost}>New Post</button>	
					:
						<div></div>
				}
				{
					this.state.newPost ?
						<div className="newPost ">
							<h3>New Post</h3>
							<div className="newPostWrapper well well-sm">
							
							
							<form onSubmit={this.handleSubmit}>
								<input type="text" className="form-control" value={this.state.newTitle} 
									onChange={this.titleChange} placeholder="Post Title"/>
								<textarea type="text" value={this.state.newDescription} 
									onChange={this.descriptionChange} placeholder="Text" className="newPostText"/>
								<input type="file" onChange={this.fileChangedHandler}/>
								<button action="submit">Submit</button>
							</form>
							
							</div>
						</div>
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
		imageURL: state.posts.imageURL,
		loadedComments: state.comments.loadedComments
	}
}
export default connect(mapStateToProps,{getPosts,submitPost, getPicture, 
	uploadPic, getComments})(Posts);
