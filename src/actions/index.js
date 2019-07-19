export const LOGIN = 'LOGIN'; 
export const RECIEVED_TOKEN =  'RECIEVED_TOKEN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REG_RESPONSE = 'REG_RESPONSE';

//////////////////////////////login ///////////////////
function fetchTokenJSON(payload) {
	console.log('at login payload is: ', payload);
	return fetch('http://18.188.180.75:3131/api/login', { 
		 method: 'GET', 
		 headers: new Headers({
			 'Authorization': 'Basic '+btoa('username:password'), 
			 'Content-Type': 'application/x-www-form-urlencoded',
			 'email' : payload.email,
			 'password' : payload.password 
		 }) 
	 }).then(response => response.json());
}

function fetchToken(payload){
	console.log('in fetchToken function');
	return function(dispatch) {
		return fetchTokenJSON(payload).then(json => dispatch(recieveToken(json)));
	}
}

function recieveToken(json){
	console.log('in recieveToken response was: ');
	console.log(json);
	var token = json; ///check for err
	if(!json.success){
		return {
			type: LOGIN_FAILED,
			loggedIn: false
		}
	} else {
		return{
				type: RECIEVED_TOKEN,
				token,
				loggedIn: true,
			}
	}
}

export function login(payload){
	console.log('in login function');
	return fetchToken(payload);
}
//////////////////////////////register user///////////////
export function registerUser(userInfo){
	return callRegisterUser(userInfo);
}

function registerJSON(userInfo){
	console.log('in register userInfo is: ', userInfo);
	return fetch('http://18.188.180.75:3131/api/register', { 
		method: 'post',
		headers: new Headers({
	 'Authorization': 'Basic '+btoa('username:password'), 
	 'Content-Type': 'application/x-www-form-urlencoded',
	 'email' : userInfo.email,
	 'password' : userInfo.password,
	 'firstName' : userInfo.firstName,
	 'lastName' : userInfo.lastName
	 }), 
	 body: 'A=1&B=2'
	}).then(response => response.json());
}

function callRegisterUser(userInfo){
	return function(dispatch) {
		return registerJSON(userInfo).then(json => dispatch(registerResponse(json)));
	}
}

function registerResponse(json){
	var response = json;
	console.log('the json response was: ');
	console.log(json);
	return {
		type: REG_RESPONSE,
		response
	}
}
