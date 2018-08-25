import React, { Component } from 'react';
import { uniq } from 'lodash-es';
import MovieView from './components/MovieView/MovieView';
import Watchlist from './components/Watchlist/Watchlist';

class App extends Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			watchlist: [],
			error: ''
		};

		this.addToWatchlist = this.addToWatchlist.bind(this);
		this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
	}

	componentDidMount() {
		// I'm passing in my TMDB API key as an environment variable so I don't publish it to GitHub.
		getMovies(process.env.REACT_APP_API_KEY)
			.then(result => {
				this.setState({
					movies: result.results
				});
			})
			.catch(err => {
				this.setState({
					error: err
				});
			});
	}

	addToWatchlist(movie) {
		this.setState({
			watchlist: uniq(this.state.watchlist.concat(movie))
		});
	}

	removeFromWatchlist(movie) {
		const index = this.state.watchlist.findIndex(m => m.id === movie.id);
		const watchlist = this.state.watchlist;

		this.setState({
			watchlist: watchlist.slice(0, index).concat(watchlist.slice(index + 1))
		});
	}

	render() {
		return (
			<div>
				<div>{this.state.movies.length}</div>
				<div>
					<Watchlist movies={this.state.watchlist} onRemove={this.removeFromWatchlist} />
				</div>
				<div>
					{this.state.movies.map((movie, index) => (
						<MovieView key={index} movie={movie} onAddToWatchlist={this.addToWatchlist} />
					))}
				</div>
			</div>
		);
	}
}

function getMovies(apiKey) {
	return fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	).then(result => result.json());
}

export default App;
