export const GET_FRIENDS = 'GET_FRIENDS';
export const RECIEVE_FRIENDS = 'RECIEVE_FRIENDS';
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const UNFRIEND_RESPONSE = 'UNFRIEND_RESPONSE';
export const ADD_FRIEND_RESPONSE = 'ADD_FRIEND_RESPONSE';

const API_URL = 'http://3.16.112.17:3131';

//GET FRIENDS LIST/////////
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
	return fetch(API_URL + '/api/myfriends', {
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

//SEARCH FOR A NEW FRIEND/////////
//add token checking ??
export function searchForUser(userid, token, firstName, lastName){
	return fetchUser(userid, token, firstName, lastName);
}

function fetchUser(userid, token, firstName, lastName){
	return function(dispatch) {
		return fetchUserJSON(userid, token, firstName, lastName).then(
			json => dispatch(searchResult(json)));
	}
}

function fetchUserJSON(userid, token, firstName, lastName){
	return fetch(API_URL + '/api/search', {
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
	var result = json;
	return{
		type: SEARCH_RESULT,
		result
	}
}


//REMOVE A FRIEND////////////////////////
export function unFriend(userid, token, friend){
	return unfriendRequest(userid, token, friend);
}

function unfriendRequest(userid, token,friend){
	return function(dispatch){
		return unfriendRequestJSON(userid, token, friend).then(json => dispatch(
			unfriendResponse(json)));
	}
}

function unfriendRequestJSON(userid, token, friend){
	return fetch(API_URL + '/api/unfriend', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userid,
			'token': token,
			'friendid': friend,
		}),
	}).then(response => response.json());
}

function unfriendResponse(json){
	var response = json;
	return {
		type: UNFRIEND_RESPONSE,
		response
	}
}

//ADD A FRIEND////////////////////////
export function addFriend(userid, token, friend){
	return addFriendRequest(userid, token, friend);
}

function addFriendRequest(userid, token,friend){
	return function(dispatch){
		return addFriendRequestJSON(userid, token, friend).then(json => dispatch(
			addFriendResponse(json)));
	}
}

function addFriendRequestJSON(userid, token, friend){
	return fetch(API_URL + '/api/addfriend', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userid,
			'token': token,
			'friendid': friend,
		}),
	}).then(response => response.json());
}

function addFriendResponse(json){
	var response = json;
	return {
		type: ADD_FRIEND_RESPONSE,
		response: response
	}
}
