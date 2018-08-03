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
			console.log('no succes?', action);
			if(action.response.success){
				console.log('add friend success', action.response);
				return {...state, friends: action.response.friends}
			}	
			return state;
		case UNFRIEND_RESPONSE:
		//remove friend from list if success
			console.log('unfriend response reducer', action.response);
			if(action.response.success) {
				//remove action.response.friendId
				var friendList = state.friends;
				//friendList.filter(friend => friend.iduser != action.response.friendId);
				console.log('made it to return');
				return {...state, friends: action.response.friends}
			}
			return state;
		case SEARCH_RESULT:
			console.log(action.result);
			if(action.result.friends[0]){ ////allow multiple
				return {...state, newFriend: action.result.friends[0]}
			}
			return state;
			
		default:
			return state;
	}
} 
