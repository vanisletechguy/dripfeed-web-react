export const GET_FRIENDS = 'GET_FRIENDS';
export const RECIEVE_FRIENDS = 'RECIEVE_FRIENDS';

export function getFriends(userid, token){
	return fetchFriends(userid, token);
}	

function fetchFriends(userid, token){
	return function(dispatch) {
		return fetchFriendsJSON(userid, token).then(json => dispatch(recieveFriends(json)));
	}	
}

function fetchFriendsJSON(userid, token)
{
	return fetch('http://localhost:3131/api/myfriends', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': 1,
			'token': token 
		}),
	}).then(response => response.json());
}

function recieveFriends(json){
	var friends = json.friends;
	return{
		type: RECIEVE_FRIENDS,
		friends
	}
}
