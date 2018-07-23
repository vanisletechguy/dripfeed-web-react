export const LOGIN = 'LOGIN'; 
export const RECIEVED_TOKEN =  'RECIEVED_TOKEN';

function fetchTokenJSON(payload) {
	return fetch('http://localhost:3131/api/login', { 
		 method: 'post', 
		 headers: new Headers({
			 'Authorization': 'Basic '+btoa('username:password'), 
			 'Content-Type': 'application/x-www-form-urlencoded',
			 'iduser' : '1',
			 'email' : 'arasfsdfuy@gmail.com'
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
