import React from "react";
import { connect } from "react-redux";
import {
	handleTradeExpandAction,
	postWantTradeToSwappuyoApi
} from "../actions/index";
import Markdown from "markdown-to-jsx";
import { render } from "react-dom";

const handleExpandClick = (props, item) => {
	props.dispatch(handleTradeExpandAction(item.itemId));
};

const TradeDetails = props => {
	return (
		<React.Fragment>
			{props.items.map(item => {
				if (item.expanded) {
					return (
						<React.Fragment>
							<li key={item.itemId}>
								<button
									onClick={e => {
										props.dispatch(handleTradeExpandAction(item.itemId));
									}}
								>
									expand
								</button>
								{item.itemTitle}

								<div>submitted by {item.itemAuthor}</div>
								<br />
								<div dangerouslySetInnerHTML={{ __html: item.content }} />
							</li>
							<button
								onClick={e => {
									console.log(
										item.content,
										item.itemTitle,
										item.itemAuthor,
										item.itemUrl,
										item.itemId
									);
									props.dispatch(
										postWantTradeToSwappuyoApi(
											item.itemTitle,
											item.itemUrl,
											item.itemAuthor,
											props.authToken
										)
									);
								}}
							>
								SAVE
							</button>
						</React.Fragment>
					);
				}

				return (
					<React.Fragment>
						<li key={item.itemId}>
							<button
								onClick={e => {
									props.dispatch(handleTradeExpandAction(item.itemId));
								}}
							>
								expand
							</button>
							{item.itemTitle}
						</li>
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return {
		authToken: state.loginReducer.authToken,
		items: state.itemsReducer.items,
		expanded: state.itemsReducer.expanded,
		user: state.loginReducer.user
	};
}

export default connect(mapStateToProps)(TradeDetails);
