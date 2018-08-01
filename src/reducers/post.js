import {RECIEVE_POSTS} from '../actions/posts'; 
import {POST_RESPONSE} from '../actions/posts';
import {PIC_RESPONSE} from '../actions/posts';
import {S3_SUCCESS} from '../actions/posts';
import {S3_FAIL} from '../actions/posts';

export default function posts(state={}, action){
	switch (action.type) {
		case RECIEVE_POSTS:
			if(action.posts && action.posts[0]){
				state.posts = action.posts;
				state.loadedPosts = true;
			} else {
				state = {
					posts: action.posts,
					loadedPosts: true
				}
			}
			return state;	
		case POST_RESPONSE:
			if(action.response.ok == true) {
				state = {postSubmitSuccess: true}
			}
			return state;
		case PIC_RESPONSE:
			return state;
		case S3_SUCCESS:
			state.picUpload = true;
			state.imageURL = action.url;
			return state;
		case S3_FAIL:
			return state;
		default:
			state = {
				posts,
				loadedPosts: false,
				postSubmitSuccess: false,
				picUpload: false,
				imageURL: ''
			}
			return state;	
	}
}
