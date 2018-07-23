export const GET_POSTS = 'GET_POSTS';
export const RECIEVE_POSTS = 'RECIEVE_POSTS';
export const POST_RESPONSE = 'POST_RESPONSE';


///////////////////////////////////////Get Posts/////////////////////
export function getPosts(userId, token){
	return fetchPosts(userId, token);
}

function fetchPosts(userId, token){
	return function(dispatch) {
		return fetchPostsJSON(userId, token).then(json => dispatch(recievePosts(json)));
	}
}

function fetchPostsJSON(userId, token){
	return fetch('http://localhost:3131/api/posts', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': 1,
			'token': token
		}),
	}).then(response => response.json());
}

function recievePosts(json){
	var posts = json.posts;
	return{
		type: RECIEVE_POSTS,
		posts	
	};
}
///////////////////////////////////////Submit Post/////////////////////
export function submitPost(post, token){
	return submit(post, token);
}

function submit(post, token){
	return function(dispatch) {
		return submitPostJSON(post, token).then(json => dispatch(submitResponse(json)));
	}
}

function submitPostJSON(token, post){
	console.log('submit token is', token);
	console.log('submit post is', post);
	return fetch('http://localhost:3131/api/posts', {
		method: 'put',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token,
			'title': post.title,
			'description' : post.description,
			'userId': 1
		})
	})
}

function submitResponse(json){
	var response = json;
	console.log('responsealala', response);
	return{
		type: POST_RESPONSE,
		response
	};
}
