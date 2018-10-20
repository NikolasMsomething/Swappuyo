import React, { Component } from "react";
import { connect } from "react-redux";
import { getFromSubRedditMarkdown } from "../actions";

function SearchComponent(props) {
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				let subreddit = e.currentTarget.tradeReddits.value;
				console.log(e.currentTarget.tradeReddits.value);
				props.dispatch(getFromSubRedditMarkdown(props.refreshToken, subreddit));
			}}
		>
			<label forHtml="search"> </label>
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
