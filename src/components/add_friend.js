import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {searchFriend} from '../actions/friends';
//import {addFriend} from '../actions/friends';

class AddFriend extends Component {
	render(){
		if(this.props.loggedIn && this.props.token){
			return(
				<div>
					Add a friend
				</div>
			);
		} else {
			return(
				<div></div>
			);
		}
	}
}

function mapStateToProps(state){
	if(!state.auth.loggedIn){return {loggedIn: false};}
	return {
		loggedIn: state.auth.loggedIn,
		token: state.auth.token
	}
}
export default connect(mapStateToProps, null)(AddFriend);
