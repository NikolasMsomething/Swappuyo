import React from "react";
import { connect } from "react-redux";
import { handleTradeExpandAction } from "../actions/index";

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
								onClick={() =>
									props.dispatch(handleTradeExpandAction(item.itemId))
								}
							>
								{item.itemTitle}
								<br />
								<p>{item.content}</p>
							</li>
						</React.Fragment>
					);
				}

				return (
					<React.Fragment>
						<li
							id={item.itemId}
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
