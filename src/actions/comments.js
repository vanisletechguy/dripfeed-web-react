export const GET_COMMENTS = 'GET_COMMENTS';
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS';
export const POST_RESPONSE = 'POST_RESPONSE';
export const COMMENT_RESPONSE = 'COMMENT_RESPONSE';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export function getComments(userid, token, postId){
	return fetchComments(userid, token, postId);
}

function fetchComments(userid, token, postId){
	return function(dispatch){
		return fetchCommentsJSON(userid, token, postId).then(json => dispatch(
			recieveComments(json)));
	}
}

function fetchCommentsJSON(userid, token, postId){
	return fetch('http://18.188.180.75:3131/api/comments', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userid,
			'token': token,
			'postId': postId
		}),
	}).then(response => response.json());
}

function recieveComments(json){
	var comments = json.comments;
	return {
		type: RECIEVE_COMMENTS,
		comments
	};
}

export function clearComments(){
	return {
		type: CLEAR_COMMENTS
	}
}

///////////////////////////////////////Submit Comment ////////////////
export function submitComment(userId, token, postId, text){
	return submit(userId, token, postId, text);
}
function submit(userId, token, postId, text){
	return function(dispatch) {
		return submitCommentJSON(userId, token, postId, text).then(json => dispatch(
			submitResponse(json)));
	}
}

function submitCommentJSON(userId, token, postId, text) {
	return fetch('http://18.188.180.75:3131/api/comments', {
		method: 'put',
		headers: new Headers({
		'Content-Type': 'application/x-www-form-urlencoded',
		'userid': userId,
		'token': token,
		'postId': postId,
		'text': text
		})
	});
}

function submitResponse(json){
	var response = json;
	return {
		type: COMMENT_RESPONSE,
		response
	};
}
