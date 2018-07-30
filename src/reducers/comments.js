import {RECIEVE_COMMENTS, COMMENT_RESPONSE} from '../actions/posts';

export default function comments(state={}, action){
	switch(action.type){
		case RECIEVE_COMMENTS:
			if(action.comments && action.comments[0]){
				state = {
					comments: action.comments,
					loadedComments: true
				}
			} else {
				state = {
					comments: action.comments,
					loadedComments: true
				}
			}
			return state;
		case COMMENT_RESPONSE:
			if(action.response.ok == true){
				state = {commentSubmitSuccess: true}
			}
			return state;
		default:
			state = {
				comments,
				loadedComments: false,
				commentSubmitSuccess: false
			}
			return state;
	}
}
