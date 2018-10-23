import React from "react";
import { connect } from "react-redux";
import {
	handleTradeExpandAction,
	postWantTradeToSwappuyoApi
} from "../actions/index";
import "./styles/TradeDetails.css";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import SearchComponent from "./searchComponent";

const TradeDetails = props => {
	return (
		<ul className="gridBoxTrade">
			{props.items.map(item => {
				if (item.expanded) {
					return (
						<React.Fragment>
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
						</React.Fragment>
					);
				}

				return (
					<React.Fragment>
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
					</React.Fragment>
				);
			})}
		</ul>
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
