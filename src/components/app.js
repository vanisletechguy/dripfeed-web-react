import React, { Component } from 'react';
import Auth from './auth';
import Friends from './friends';
import Posts from './posts';
import AddFriend from './add_friend'

export default class App extends Component {
  render() {
    return (
			<div className="col-md-12">
				<h2>Drip Feed</h2><br/> 
				<div className="col-md-3 well well-sm">
					<div>
						<Auth />
					</div>
					<div>
						<AddFriend />
					</div>
					<div>
						<Friends />
					</div>
				</div>
				<div className="col-md-5 well well-sm">
					<Posts />
				</div>
			</div>
    );
  }
}
