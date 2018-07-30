import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions/comments';
import {submitComment} from '../actions/comments';

class Comments extends Component{
	render(){
		return(
			<div>
				<button>New Comment</button>	
				<ul>
					{
						//map comments
					}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {};	
}
export default connect(mapStateToProps, {getComments, submitComment})(Comments);
