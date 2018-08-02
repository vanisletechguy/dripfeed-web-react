import {RECIEVE_COMMENTS, COMMENT_RESPONSE} from '../actions/comments';

export default function comments(state={}, action){
	switch(action.type){
		case RECIEVE_COMMENTS:
			console.log('in comments action is:', action);	
			if(action.comments && action.comments[0]){
				state.comments = [...state.comments, action.comments];
				state.loadedComments = true;
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
