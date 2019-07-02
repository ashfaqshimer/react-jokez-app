import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';
import Joke from './Joke';

const API_URL = 'https://icanhazdadjoke.com/';

export default class Main extends Component {
	static defaultProps = {
		numJokes: 10
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
		};
		this.getJokes = this.getJokes.bind(this);
		this.handleVote = this.handleVote.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.setState({ loading: true }, () => {
				this.getJokes();
			});
		}
	}
	async getJokes() {
		try {
			let jokes = [];
			while (jokes.length < this.props.numJokes) {
				const apiResponse = await axios.get(API_URL, { headers: { Accept: 'application/json' } });
				jokes.push({ id: apiResponse.data.id, joke: apiResponse.data.joke, votes: 0 });
			}
			this.setState({ jokes, loading: false }, () => {
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
			});
		} catch (error) {
			alert(error);
			this.setState({ loading: false });
		}
	}
	handleVote(id, value) {
		const updatedJokes = this.state.jokes.map(joke => {
			if (joke.id === id) {
				return { ...joke, votes: (joke.votes += value) };
			}
			return joke;
		});
		this.setState({ jokes: updatedJokes }, () => {
			window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
		});
	}
	handleClick(evt) {
		this.setState({ loading: true }, () => {
			this.getJokes();
		});
	}
	render() {
		return (
			<div className='Main'>
				<div className='header'>
					<h1> Jokez </h1>
					<p className='lead'>Cheesy one liners.</p>
					<img
						src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
						alt='smiley face'
					/>
					<button
						className='btn btn-success btn-lg mt-3'
						onClick={this.handleClick}
						disabled={this.state.loading}
					>
						New Jokes
					</button>
				</div>
				<div className='jokes-list'>
					{this.state.loading ? (
						<div className='spinner'>
							<i className='far fa-8x fa-laugh fa-spin' />
							<h1 className='title'>Getting Jokes...</h1>
						</div>
					) : (
						<ul className='list-group'>
							{this.state.jokes.map(joke => {
								return (
									<Joke
										key={joke.id}
										id={joke.id}
										joke={joke.joke}
										votes={joke.votes}
										handleVote={this.handleVote}
									/>
								);
							})}
						</ul>
					)}
				</div>
			</div>
		);
	}
}
