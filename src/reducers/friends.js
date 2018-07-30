import {RECIEVE_FRIENDS} from '../actions/friends';

export default function friends(state={}, action){
	if(!state){state = {};}
	switch (action.type) {
		case RECIEVE_FRIENDS:
			if(action.friends && action.friends[0]){
				state = {
					friends: action.friends,
					loadedFriends: true
				}
			} else {
				state = {
					friends: action.friends,
					loadedFriends: false
				}
			}
			return state;	
		default:
			return state;
	}
} 
