import {LOGIN} from '../actions/index';
import {LOGOUT} from '../actions/index';
import {RECIEVED_TOKEN} from '../actions/index';
import {LOGIN_FAILED} from '../actions/index';
import {LOGOUT_FAILED} from '../actions/index';

export default function auth(state={}, action){
	if(!state){ state = {}; }
	switch (action.type) {
		case LOGIN: 
			return state;	
		case LOGOUT:
			console.log('logout reducer');
			return state = {loggedIn: false};
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
		case LOGOUT_FAILED:
			return {...state};
		default:
			state.yourToken = '';
			return state;
	}
	return state;
}
