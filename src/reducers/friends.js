import {RECIEVE_FRIENDS} from '../actions/friends';
import {SEARCH_RESULT} from '../actions/friends';
import {UNFRIEND_RESPONSE} from '../actions/friends';
import {ADD_FRIEND_RESPONSE} from '../actions/friends';

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
					loadedFriends: true
				}
			}
			return state;	
		case ADD_FRIEND_RESPONSE:
			if(action.response.success){
				return {...state, friends: action.response.friends}
			}	
			return state;
		case UNFRIEND_RESPONSE:
			if(action.response.success) {
				var friendList = state.friends;
				return {...state, friends: action.response.friends}
			}
			return state;
		case SEARCH_RESULT:
			if(action.result.friends[0]){ ////should allow multiple
				return {...state, newFriend: action.result.friends[0]}
			}
			return state;
			
		default:
			return state;
	}
} 
