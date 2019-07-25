import {LOGIN} from '../actions/index';
import {RECIEVED_TOKEN} from '../actions/index';
import {LOGIN_FAILED} from '../actions/index';

export default function auth(state={}, action){
	if(!state){ state = {}; }
	switch (action.type) {
		case LOGIN: 
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
		case LOGIN_FAILED:
			return {...state, loggedIn: action.loggedIn, attempt: true};
		default:
			state.yourToken = '';
			return state;
	}
	return state;
}
