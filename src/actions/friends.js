export const GET_FRIENDS = 'GET_FRIENDS';
export const RECIEVE_FRIENDS = 'RECIEVE_FRIENDS';
export const SEARCH_RESULT = 'SEARCH_RESULT';

export function getFriends(userid, token){
	return fetchFriends(userid, token);
}	

function fetchFriends(userid, token){
	return function(dispatch) {
		return fetchFriendsJSON(userid, token).then(json => dispatch(
			recieveFriends(json)));
	}	
}

function fetchFriendsJSON(userid, token){
	return fetch('http://localhost:3131/api/myfriends', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userid,
			'token': token 
		}),
	}).then(response => response.json());
}

function recieveFriends(json){
	var friends = json.friends;
	return{
		type: RECIEVE_FRIENDS,
		friends
	};
}

/////////////////////////////SEARCH FOR A NEW FRIEND/////////
//add token
export function searchForUser(userid, token, firstName, lastName){
	return fetchUser(userid, token, firstName, lastName);
}

function fetchUser(userid, token, firstName, lastName){
	return function(dispatch) {
		return fetchUserJSON(userid, token, firstName, lastName).then(json => dispatch(
			searchResult(json)));
	}
}

function fetchUserJSON(userid, token, firstName, lastName){
	
	console.log('last name result: ', lastName);	
	return fetch('http://localhost:3131/api/search', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'firstName': firstName,
			'lastName': lastName,
			'userid': userid,
			'token': token
		}),
	}).then(response => response.json());
}

function searchResult(json){
	console.log('search result: ', json);	
	var result = json;
	return{
		type: SEARCH_RESULT,
		result
	}
}
