export const GET_POSTS = 'GET_POSTS';
export const RECIEVE_POSTS = 'RECIEVE_POSTS';
export const POST_RESPONSE = 'POST_RESPONSE';
export const PIC_RESPONSE = 'PIC_RESPONSE';
export const S3_RESPONSE = 'S3_RESPONSE';
export const S3_SUCCESS = 'S3_SUCCESS';
export const S3_FAIL = 'S3_FAIL';
export const CLEAR_POSTS = 'CLEAR_POSTS';

const API_URL = 'http://3.16.112.17:3131';

//Get Posts/////////////////////
export function getPosts(userId, token){
	return fetchPosts(userId, token);
}

export function getMyFeed(userId, token) {
	return fetchMyFeed(userId, token);
}

function fetchPosts(userId, token){
	return function(dispatch) {
		return fetchPostsJSON(userId, token).then(json => dispatch(
			recievePosts(json, userId, token)));
	}
}

function fetchMyFeed(userId, token){
	return function(dispatch) {
		return fetchMyFeedJSON(userId, token).then(json => dispatch(
			recievePosts(json, userId, token)));
	}
}

function fetchPostsJSON(userId, token){
	return fetch(API_URL + '/api/posts', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userId,
			'token': token
		}),
	}).then(response => response.json());
}

function recievePosts(json, userId, token){
	var posts = json.posts;
		return{
			type: RECIEVE_POSTS,
			posts	
		};
}

function fetchMyFeedJSON(userId, token){
	return fetch(API_URL + '/api/myFeed', {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'userid': userId,
			'token': token
		}),
	}).then(response => response.json());
}

//Clear Posts/////////////////////
export function clearPosts(){
	return {
		type: CLEAR_POSTS
	};
}

//Submit Post/////////////////////
export function submitPost(userId, token, post){
	return submit(userId, token, post);
}

function submit(userId, token, post){
	return function(dispatch) {
		return submitPostJSON(userId, token, post).then(json => dispatch(
			submitResponse(json)));
	}
}

function submitPostJSON(userId, token, post){
	return fetch(API_URL + '/api/upload', {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token,
			'title': post.title,
			'description' : post.description,
			'userId': userId,
			'picName': post.image,
			'picture': post.image
		}),
		body: {picture: post.image}
	});
}

function submitResponse(json){
	var response = json;
	return{
		type: POST_RESPONSE,
		response
	};
}

//UploadPic ////////////////////////
export function uploadPic(newPicture, token){
	return submitPic(newPicture, token);
}

function submitPic(newPicture, token){
	return function (dispatch) {
		return getSignedURLRequest(newPicture, token).then(json => dispatch( 
			sendToS3JSON(json, newPicture)));
	};
}

function getSignedURLRequest(newPicture, token) {
	return	fetch(API_URL + '/api/sign-s3', {
		method: 'get',
		headers: new Headers({
			'contentType': "text/plain",
			'token': token,
			'picturename': newPicture.name,
			'filetype': newPicture.type
		}),
	}).then(response => response.json());
}

function sendToS3JSON(json, newPicture) {
	const signedRequest = json.data.signedRequest;
	const signedURL = json.data.url;
	const xhr = new XMLHttpRequest();
	xhr.open('PUT', signedRequest);
	xhr.onreadystatechange = () => {
	  if(xhr.readyState === 4){
			if(xhr.status === 200){
				return {
					type: S3_SUCCESS,
					url: signedURL
				};
		  }
		  else{
			  alert('Could not upload file.');
				return{
					type: S3_FAIL,
					url: signedURL
				};
		  }
	  }
  };
  xhr.send(newPicture);
				return{
					type: S3_SUCCESS,
					url: signedURL
				};
}

function s3Response(Response = ''){
	var response = Response;
	return{
		type: S3_RESPONSE,
		response
	};
}
