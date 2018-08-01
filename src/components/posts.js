import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/posts';
import {submitPost, getPicture} from '../actions/posts';
import Comments from './comment';
import {uploadPic} from '../actions/posts';

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
		console.log('the pic is...: ', event.target.files[0]);
		this.setState({newPostPic: event.target.files[0]})
		///get signed url and upload pic here



		this.props.uploadPic(event.target.files[0], this.props.token);
		//pic should now be in s3 and url in props
	}

	handleSubmit(event){
		event.preventDefault();
		//check props to see if pic is uploaded before submiting
		/////pic should already be in s3, save only url with post here
		var post = {title: this.state.newTitle, description: this.state.newDescription, 
			image: this.props.imageURL};
		console.log('the post is: ', post);
		this.props.submitPost(this.props.userId, this.props.token, post);
		this.setState({newPost: false});
	}
	
	render(){
		if(this.props.loggedIn && !this.props.loadedPosts){
			this.props.getPosts(this.props.userId, this.props.token); //should call once? 
		}
		if(this.props.posts && this.props.posts[0]) {
			this.props.posts.map(post => {
				getPicture(this.props.userId, this.props.token, post.imageURI); ///screwy
			});
		}
		return(
			<div className="posts">
				{
					this.state.newPost ?
						<div>
							<h3>making a new post</h3>
							<form onSubmit={this.handleSubmit}>
								<h4>Title:</h4>
								<textarea value={this.state.newTitle} onChange={this.titleChange}/>
								<textarea value={this.state.newDescription} 
									onChange={this.descriptionChange}/>
								<input type="file" onChange={this.fileChangedHandler}/>
								<button action="submit">Submit</button>
							</form>
						</div>
					:
						<div></div>
				}
				<h3>Posts</h3> 
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
													<div className="postImage well well-sm"> <img src={post.imageURI}/> </div>
													:
													<div></div>
											}
											<div className="well well-sm postText">
												<h4>{post.title}</h4>
												<p>{post.description}</p>
											</div>
											<div className="well well-sm comments">
												<h4>Comments</h4>
												<Comments/>
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
	if(!state.auth && !state.posts && !state.posts.loadedPosts && !state.auth.token){
		return {loggedIn: false, loadedPosts: false};}
	return {
		loggedIn: state.auth.loggedIn,
		userId: state.auth.userId,
		posts: state.posts.posts,
//		postImages: state.posts.images,
		loadedPosts: state.posts.loadedPosts,
//		loadedImages: state.posts.loadedImages,
		postSubmitSuccess: state.posts.postSubmitSuccess,
		token: state.auth.token,
		picUpload: state.posts.picUpload,
		imageURL: state.posts.imageURL
	}
}
export default connect(mapStateToProps,{getPosts,submitPost, getPicture, uploadPic})(Posts);
