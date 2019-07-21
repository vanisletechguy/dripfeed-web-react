import {RECIEVE_COMMENTS, COMMENT_RESPONSE} from '../actions/comments';
import {RECIEVE_POSTS} from '../actions/posts';
import {CLEAR_COMMENTS} from '../actions/comments';

export default function comments(state={}, action){
	switch(action.type){
		case RECIEVE_POSTS:
				return {...state, loadedComments: false};
		case RECIEVE_COMMENTS:
			if(action.comments && action.comments[0]){
				state.comments = [...state.comments, action.comments];
				state.loadedComments = true;
			} else {
				return {...state, loadedComments: true};
			} 
			return state;
		case CLEAR_COMMENTS:
				return {...state, loadedComments: false, comments: []};
		case COMMENT_RESPONSE:
			if(action.response.ok == true){
				state.commentSubmitSuccess = true;
			}
			return state;
		default:
			if(!state.comments || !state.comments[0]){
				state = {
					comments: [],
					loadedComments: false,
					commentSubmitSuccess: false
				}
			}
			return state;
	}
}
