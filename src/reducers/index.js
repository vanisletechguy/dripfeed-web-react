import { combineReducers } from 'redux';
import auth from './auth';
import friends from './friends';
import posts from './post';
import comments from './comments';

const rootReducer = combineReducers({
	auth, friends, posts, comments
});
export default rootReducer;
