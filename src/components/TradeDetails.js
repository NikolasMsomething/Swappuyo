import React from "react";
import { connect } from "react-redux";
import { handleTradeExpandAction } from "../actions/index";
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
							<li
								key={item.itemId}
								onClick={e => {
									props.dispatch(handleTradeExpandAction(item.itemId));
								}}
							>
								{item.itemTitle}
								<br />
								<Markdown>{item.content}</Markdown>
							</li>
							<button
								onClick={e =>
									console.log(
										item.content,
										item.itemTitle,
										item.itemAuthor,
										item.itemUrl,
										item.itemId
									)
								}
							>
								SAVE
							</button>
						</React.Fragment>
					);
				}

				return (
					<React.Fragment>
						<li
							key={item.itemId}
							onClick={() => {
								props.dispatch(handleTradeExpandAction(item.itemId));
								console.log(typeof item.itemId);
							}}
						>
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
		items: state.itemsReducer.items,
		expanded: state.itemsReducer.expanded
	};
}

export default connect(mapStateToProps)(TradeDetails);
