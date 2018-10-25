import React from "react";
import { connect } from "react-redux";
import {
	handleTradeExpandAction,
	postWantTradeToSwappuyoApi
} from "../../actions/index";
import "../styles/TradeDetails.css";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

const TradeDetails = props => {
	return (
		<ul role="Main" className="gridBoxTrade">
			{props.items.map((item, index) => {
				if (item.expanded) {
					return (
						<li className="expanded" key={item.itemId}>
							<button
								className="btn"
								onClick={e => {
									props.dispatch(handleTradeExpandAction(item.itemId));
								}}
							>
								<FaChevronUp />
							</button>
							<h2>{item.itemTitle}</h2>

							<div className="tradeAuthorName">
								submitted by {item.itemAuthor}
							</div>
							<br />
							<div>
								<div
									className="tradeDetailsContentBox"
									dangerouslySetInnerHTML={{ __html: item.content }}
								/>
								<button
									className="btn-save"
									onClick={e => {
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
									<IoIosSave />
								</button>
							</div>
						</li>
					);
				}

				return (
					<li key={item.itemId}>
						<button
							className="btn"
							onClick={e => {
								props.dispatch(handleTradeExpandAction(item.itemId));
							}}
						>
							<FaChevronDown />
						</button>
						<h2>{item.itemTitle}</h2>
					</li>
				);
			})}
		</ul>
	);
};

function mapStateToProps(state) {
	return {
		authToken: state.loginReducer.authToken,
		items: state.itemsReducer.items,
		expanded: state.itemsReducer.expanded,
		user: state.loginReducer.user
	};
}

export default connect(mapStateToProps)(TradeDetails);
