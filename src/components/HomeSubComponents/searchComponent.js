import React from "react";
import { connect } from "react-redux";
import { getFromSubRedditMarkdown } from "../../actions";
import "../styles/searchComponent.css";
import { MdSearch } from "react-icons/md";

function SearchComponent(props) {
	return (
		<div className="searchForm-OuterDiv">
			<form
				className="select"
				onSubmit={e => {
					e.preventDefault();
					let subreddit = e.currentTarget.tradeReddits.value;
					let redditFilter = e.currentTarget.redditSort.value;
					props.dispatch(
						getFromSubRedditMarkdown(props.accessToken, subreddit, redditFilter)
					);
				}}
			>
				<label forhtml="search"> </label>
				<select className="search_categories-reddits" name="tradeReddits">
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
				<select className="search_categories-sort" name="redditSort">
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
				<button type="submit">
					<MdSearch />
				</button>
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		items: state.itemsReducer.items,
		accessToken: state.loginReducer.accessToken
	};
}
export default connect(mapStateToProps)(SearchComponent);
