import {RECIEVE_COMMENTS, COMMENT_RESPONSE} from '../actions/comments';
import {RECIEVE_POSTS} from '../actions/posts';

export default function comments(state={}, action){
	switch(action.type){
		case RECIEVE_POSTS:
				return {...state, loadedComments: false};
		case RECIEVE_COMMENTS:
			console.log('in comments action is:', action);	

			//if new comments add them to the state

			if(action.comments && action.comments[0]){
				state.comments = [...state.comments, action.comments];
				//state= [...state.comments, action.comments];
				state.loadedComments = true;
			} else {
				//supposed 
				return {...state, loadedComments: true};
			} 
			return state;
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
