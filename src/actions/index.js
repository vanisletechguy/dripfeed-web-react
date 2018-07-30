export const LOGIN = 'LOGIN'; 
export const RECIEVED_TOKEN =  'RECIEVED_TOKEN';

//////////////////////////////login ///////////////////
function fetchTokenJSON(payload) {
	return fetch('http://localhost:3131/api/login', { 
		 method: 'post', 
		 headers: new Headers({
			 'Authorization': 'Basic '+btoa('username:password'), 
			 'Content-Type': 'application/x-www-form-urlencoded',
			 'email' : '2222arasfsdfuy@gmail.com',
			 'password' : 'password'
		 }), 
		 body: 'A=1&B=2'
	 }).then(response => response.json());
}

function fetchToken(payload){
	return function(dispatch) {
		return fetchTokenJSON(payload).then(json => dispatch(recieveToken(json)));
	}
}

function recieveToken(json){
	var token = json; ///check for err
	return{
		type: RECIEVED_TOKEN,
		token,
		loggedIn: true,
	}
}

export function login(payload){
	return fetchToken(payload);
}
//////////////////////////////register user///////////////
export function registerUser(userInfo){
	return registerUser(userInfo);
}

function registerJSON(userInfo){
	return fetch('http://localhost:3131/api/register', { 
		method: 'post',
		headers: new Headers({
	 'Authorization': 'Basic '+btoa('username:password'), 
	 'Content-Type': 'application/x-www-form-urlencoded',
	 'iduser' : '4',
	 'email' : '2222arasfsdfuy@gmail.com',
	 'password' : 'password',
	 'firstName' : 'asdddfai',
	 'lastName' : 'asdffd'
	 }), 
	 body: 'A=1&B=2'
	}).then(response => response.json());
}

function registerUser(userInfo){
	return function(dispatch) {
		return registerJSON(userInfo).then(json => dispatch(registerResponse(json)));
	}
}

function registerResponse(json){
	var response = json;
	return {
		type: REG_RESPONSE,
		response
	}
}
