import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions/comments';
import {submitComment} from '../actions/comments';

class Comments extends Component{
	constructor(props){
		super(props);
		this.makeComment = this.makeComment.bind(this);
		this.state = {makingComment: false, newComment: '', loaded: false};
		this.submitComment = this.submitComment.bind(this);
		this.commentChanged = this.commentChanged.bind(this);
	}
	makeComment(){
		this.setState({makingComment: true});
	}
	commentChanged(event){
		this.setState({newComment: event.target.value})
	}
	submitComment(event){
		event.preventDefault();
		console.log('this post id is: ', this.props.postId);
		this.props.submitComment(this.props.userId, this.props.token, 
			this.props.postId, this.state.newComment);
	}
	render(){
		return(
			<div>
				{
					this.state.makingComment ?
						<div>
							<h4>Submit Your Comment</h4>
							<form onSubmit={this.submitComment}>
								<textarea value={this.state.newComment} 
									onChange={this.commentChanged}/>
								<button action="submit">Submit</button>
							</form>
						</div>
					:
						<div></div>
				}
				<button onClick={this.makeComment}>New Comment</button>	
				<ul>
					{
						this.props.loadedComments && this.props.comments && 
							this.props.comments.comments && this.props.comments.comments[0] ?
							this.props.comments.comments.map(comments => {
								return comments.map(comment => {
									if(comment.postid === this.props.postId){
										return (
											<div key={comment.commentid}>
												<li>
													<p>PostId: {comment.postid} UserId: {comment.userid} </p>	
													<p>Text: {comment.text}</p>	
												</li>
											</div>
										);
									}
								})

							})
						:
							<p></p>
					}
				</ul>
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
		comments: 	state.comments,
		loadedComments: state.comments.loadedComments
	};	
}
export default connect(mapStateToProps, {getComments, submitComment})(Comments);
