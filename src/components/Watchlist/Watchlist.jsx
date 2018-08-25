import React, { Component } from 'react';

class Watchlist extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const list = this.props.movies.map((movie, index) => (
			<div key={index}>
				{movie.title}
				<button onClick={() => this.props.onRemove(movie)}>Remove</button>
			</div>
		));

		if (this.props.movies.length > 0) {
			return (
				<div>
					<h1>Watchlist</h1>
					{list}
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default Watchlist;
