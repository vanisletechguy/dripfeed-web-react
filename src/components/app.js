import React, { Component } from 'react';
import Auth from './auth';
import Friends from './friends';
import Posts from './posts';
import AddFriend from './add_friend';
import Navigation from './navigation';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'; 
import Grid from '@material-ui/core/Grid';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.classes = makeStyles(theme => ({
			root: {
				flexGrow: 1,
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			title: {
				flexGrow: 1,
				align: 'center',
				margin: 'auto',
			},

		}));
	}

  render() {
    return (
		 <div className={this.classes.root}>
			 <Grid container spacing={1}>
				 <Grid item xs={12}>
					<AppBar position="static">
						<Toolbar>
							<Grid container justify = "center">
								<Typography variant="h2" className={this.classes.title}>
									DripFeed</Typography>
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item xs={3} className="well well-sm leftNav">
					<div>
						<Auth />
						<br/>
					</div>
					<div>
						<Navigation />
						<br/>
					</div>
					<div>
						<AddFriend />
						<br/>
					</div>
					<div>
						<Friends />
					</div>
				</Grid>
				<Grid item xs={6} className="well well-sm posts">
					<Posts />
				</Grid>
			</Grid>
		</div>
		);
  }
}
