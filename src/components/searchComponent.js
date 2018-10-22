import React, { Component } from "react";
import { connect } from "react-redux";
import { getFromSubRedditMarkdown } from "../actions";

function SearchComponent(props) {
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				let subreddit = e.currentTarget.tradeReddits.value;
				let redditFilter = e.currentTarget.redditSort.value;
				console.log(e.currentTarget.tradeReddits.value);
				console.log(e.currentTarget.redditSort.value);
				props.dispatch(
					getFromSubRedditMarkdown(props.refreshToken, subreddit, redditFilter)
				);
			}}
		>
			<label forhtml="search"> </label>
			<select name="tradeReddits">
				<option name="hardwareswap" value="hardwareswap">
					hardwareswap
				</option>
				<option name="gameswap" value="gameswap">
					gameswap
				</option>
				<option name="mechmarket" value="mechmarket">
					mechmarket
				</option>
				<option name="AVexchange" value="AVexchange">
					AVexchange
				</option>
			</select>
			<select name="redditSort">
				<option name="hot" value="hot">
					hot
				</option>
				<option name="rising" value="rising">
					rising
				</option>
				<option name="new" value="new">
					new
				</option>
			</select>
			<input type="submit" />
		</form>
	);
}

function mapStateToProps(state) {
	return {
		items: state.itemsReducer.items,
		refreshToken: state.loginReducer.refreshToken
	};
}
export default connect(mapStateToProps)(SearchComponent);
