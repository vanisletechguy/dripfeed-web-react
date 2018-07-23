import React, { Component } from 'react';
import Auth from './auth';
import Friends from './friends';
import Posts from './posts';

export default class App extends Component {
  render() {
    return (
			<div className="col-md-12">
				<h2>Drip Feed</h2><br/> 
				<div className="col-md-3 well well-sm">
					<Auth />
				</div>
				<div className="col-md-4 well well-sm">
					<Friends />
				</div>
				<div className="col-md-4 well well-sm">
					<Posts />
				</div>
			</div>
    );
  }
}
