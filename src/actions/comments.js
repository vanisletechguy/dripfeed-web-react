export const GET_COMMENTS = 'GET_COMMENTS';
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS';
export const POST_RESPONSE = 'POST_RESPONSE';

export function getComments(userid, token, postId){
	return fetchComments(userid, token, postId);
}

function fetchComments(userid, token, postId){
	return function(dispatch){
		return fetchCommentsJSON(userid, token, postId).then(json => dispatch(
			recieveComments(json)));
	}
}

function fetchCommentsJSON(useid, token, postId){
	return fetch('http://localhost:3131/api/comments', {
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

///////////////////////////////////////Submit Comment ////////////////
export function submitComment(userId, token, postId){
	return submit(userId, token, postId);
}
function submit(userId, token, post){
	return function(dispatch) {
		return submitCommentJSON(userId, token, postId).then(json => dispatch(
			submitResponse(json)));
	}
}

function submitCommentJSON(userId, token, postId) {
	return fetch('http://localhost:3131/api/comments', {
		method: 'put',
		headers: new Headers({
		'Content-Type': 'application/x-www-form-urlencoded',
		'userid': userid,
		'token': token,
		'postId': postId
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