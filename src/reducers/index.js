import { combineReducers } from 'redux';
import auth from './auth';
import friends from './friends';
import posts from './post';

const rootReducer = combineReducers({
	auth, friends, posts
});
export default rootReducer;
