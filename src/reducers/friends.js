import {RECIEVE_FRIENDS} from '../actions/friends';
import {SEARCH_RESULT} from '../actions/friends';
import {UNFRIEND_RESPONSE} from '../actions/friends';

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
		case UNFRIEND_RESPONSE:
		//remove friend from list if success
			console.log('unfriend response reducer');
			if(action.response.sucess) {
				//remove action.response.friendId
				var friendList = state.friends;
				friendList.filter(friend => friend.userId != action.response.friendId);
				console.log('made it to return');
				return {...state, friends: friendList}
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
