import React, { Component } from 'react';
import './MovieView.css';

class MovieView extends Component {
	constructor(props) {
		super(props);

		this.onAdd = this.onAdd.bind(this);
	}

	onAdd(event) {
		event.preventDefault();
		this.props.onAddToWatchlist(this.props.movie);
	}

	render() {
		const { title, overview } = this.props.movie;
		return (
			<div className="movie-box">
				<h1>{title}</h1>
				<p>{overview}</p>
				<button onClick={this.onAdd}>Add to Watchlist</button>
			</div>
		);
	}
}

export default MovieView;
