import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions/comments';
import {submitComment} from '../actions/comments';

class Comments extends Component{
	constructor(props){
		super(props);
		this.makeComment = this.makeComment.bind(this);
		this.state = {makingComment: false, newComment: '', loadedComments: false };
		this.submitComment = this.submitComment.bind(this);
		this.commentChanged = this.commentChanged.bind(this);
		this.state.comments = [];

	}

	//tell the component to display the form for creating a new comment
	makeComment(){
		this.setState({makingComment: true});
	}

	//handles changes to the new comment text area
	commentChanged(event){
		this.setState({newComment: event.target.value})
	}

	//handles submitting a new comment
	submitComment(event){
		event.preventDefault();
		console.log('this post id is: ', this.props.postId);
		this.props.submitComment(this.props.userId, this.props.token, 
			this.props.postId, this.state.newComment);
	}


	componentDidMount(){
		this.state.loadedComments = false;
		this._asyncRequest = this.props.getComments(
			this.props.userId, this.props.token, this.props.postId).then(
				data => {
					this._asyncRequest = null;	
				console.log('made async done');
				console.log('data is: ', data);
//				this.state.loadedComments = true;
				this.setState({loadedComments: true});
				this.setState({comments: data.comments});
//				this.state.comments = data.comments;
				console.log('the new state in comments is: ', this.state);
		});

	}

	//this component will render a post's comments and give the current user the 
	//option to create a new comment
	render(){
		console.log('the state in comments is: ', this.state);
		console.log('props in comments is: ', this.props);
		console.log('props comments.comments is: ', this.props.comments.comments);
/*		if(!this.state.loadedComments) {
			console.log('in comments and getting comments');
			this._asyncRequest = this.props.getComments(
				this.props.userId, this.props.token, this.props.postId).then(
					data => {
					
					console.log('made async done');
					console.log('data is: ', data);
					this.state.loadedComments = true;
					this.state.comments = data.comments;
					console.log('the new state in comments is: ', this.state);
			});
		}
*/
		return(
			<div>
				<p>testing comment</p>
				{
					this.state.loadedComments ? 	
						<p>loaded</p>	
					:
						<p>not loaded yet...</p>
				}
				<ul className="list-unstyled">
					{
						this.state.loadedComments && this.state.comments && 
							this.state.comments[0] ?
							this.state.comments.map(comment => {
									<div>testing comment2</div>
									if(comment.postid === this.props.postId){
										return (
											<div className="well well-sm" key={comment.commentid}>
												<li>
													<p>PostId: {comment.postid} UserId: {comment.userid} </p>	
													<p>Text: {comment.text}</p>	
												</li>
											</div>
										);
									}
								})

						:
							<p>Not A Comment</p>
					}
				</ul>
				<button onClick={this.makeComment}>New Comment</button>	
				{
					this.state.makingComment ?
						<div>
							<h4>Submit Your Comment</h4>
							<form onSubmit={this.submitComment}>
								<textarea value={this.state.newComment} 
									onChange={this.commentChanged} className="newPostText"/>
								<button action="submit">Submit</button>
							</form>
						</div>
					:
						<div></div>
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
