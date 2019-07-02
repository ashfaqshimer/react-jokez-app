import React, { Component } from 'react';
import './Joke.css';

export default class Joke extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(evt) {
		if (evt.target.className.includes('upvote')) {
			this.props.handleVote(this.props.id, 1);
		}
		if (evt.target.className.includes('downvote')) {
			this.props.handleVote(this.props.id, -1);
		}
		console.log(evt.target.id);
	}
	getColor() {
		if (this.props.votes >= 15) {
			return '#4CAF50';
		} else if (this.props.votes >= 12) {
			return '#8BC34A';
		} else if (this.props.votes >= 9) {
			return '#CDDC39';
		} else if (this.props.votes >= 6) {
			return '#FFEB3B';
		} else if (this.props.votes >= 3) {
			return '#FFC107';
		} else if (this.props.votes >= 0) {
			return '#FF9800';
		} else {
			return '#f44336';
		}
	}
	getEmoji() {
		if (this.props.votes >= 15) {
			return 'em em-rolling_on_the_floor_laughing';
		} else if (this.props.votes >= 12) {
			return 'em em-laughing';
		} else if (this.props.votes >= 9) {
			return 'em em-smiley';
		} else if (this.props.votes >= 6) {
			return 'em em-slightly_smiling_face';
		} else if (this.props.votes >= 3) {
			return 'em em-neutral_face';
		} else if (this.props.votes >= 0) {
			return 'em em-confused';
		} else {
			return 'em em-angry';
		}
	}
	render() {
		return (
			<li className='Joke list-group-item'>
				<div className='votes'>
					<i id='upvote' className='upvote fas fa-arrow-up' onClick={this.handleClick} />
					<div className='number-votes' style={{ borderColor: this.getColor() }}>
						{this.props.votes}
					</div>
					<i id='downvote' className='downvote fas fa-arrow-down' onClick={this.handleClick} />
				</div>
				<div className='joke'>
					<p>{this.props.joke}</p>
				</div>
				<div className='reaction'>
					<i className={this.getEmoji()} />
				</div>
			</li>
		);
	}
}
