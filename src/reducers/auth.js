import {LOGIN} from '../actions/index';
import {RECIEVED_TOKEN} from '../actions/index';

export default function auth(state={}, action){
	if(!state){ state = {}; }
	switch (action.type) {
		case LOGIN: ///reducer not required?? use recToken
			return state;	
		case RECIEVED_TOKEN:
			state = {};
			state = {
				token: action.token.yourToken,
				userId: action.token.userId,
				loggedIn: action.loggedIn,
				email: action.token.email
			}
			return state;
		default:
			state.yourToken = '';
			return state;
	}
	return state;
}
