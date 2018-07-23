import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/posts';
import {submitPost} from '../actions/posts';

class Posts extends Component {
	constructor(props){
		super(props);
		this.createPost = this.createPost.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.descriptionChange = this.descriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {newPost: false};
		this.state.newTitle = '';
		this.state.newDescription = '';
	}
	createPost(){
		this.setState(() => {
			return {newPost: true}
		});
	}
	titleChange(event){
		this.setState({newTitle: event.target.value})
	}
	descriptionChange(event){
		this.setState({newDescription: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault();
		console.log('post TARGET', event.target);
		var post = {title: this.state.newTitle, description: this.state.newDescription};
		this.props.submitPost(this.props.token, post);
		this.setState({newPost: false});
	}
	render(){
		if(this.props.loggedIn && !this.props.loadedPosts){
			this.props.getPosts(this.props.userId, this.props.token); //should call once? 
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
								<textarea value={this.state.newDescription} onChange={this.descriptionChange}/>
								<button action="submit">Submit</button>
							</form>
						</div>
					:
						<div></div>
				}
				<h3>Posts</h3> 
				{
					this.props.loadedPosts ?
						<div>
							<button onClick={this.createPost}>New Post</button>	
							<ul>
								{
									this.props.posts.map(post => {
										return(
											<li key={post.postid}>
												{post.title}
												{post.description}
											</li>
										);
									})
								}
							</ul>
						</div>
						:
							<p>loading...</p>
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
		loadedPosts: state.posts.loadedPosts,
		postSubmitSuccess: state.posts.postSubmitSuccess,
		token: state.auth.token
	}
}
export default connect(mapStateToProps,{getPosts,submitPost})(Posts);
