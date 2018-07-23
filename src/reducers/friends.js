import {RECIEVE_FRIENDS} from '../actions/friends';

export default function friends(state={}, action){
	if(!state){state = {};}
	switch (action.type) {
		case RECIEVE_FRIENDS:
			state = {
				friends: action.friends,
				loadedFriends: true
			}
			return state;	
		default:
			return state;
	}
} 
