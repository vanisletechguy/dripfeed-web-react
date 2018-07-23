import {RECIEVE_POSTS} from '../actions/posts'; 
import {POST_RESPONSE} from '../actions/posts';
export default function posts(state={}, action){
	switch (action.type) {
		case RECIEVE_POSTS:
			state = {
				posts: action.posts,
				loadedPosts: true
			}
			return state;	
		case POST_RESPONSE:
			console.log('got a post reponse');
			if(action.response.ok == true) {
				console.log('post submit accepted')
				state = {postSubmitSuccess: true}
			}
			return state;
		default:
			state = {
				posts,
				loadedPosts: false,
				postSubmitSuccess: false
			}
			return state;	
	}
}
