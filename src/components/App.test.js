import React from "react";
import AppRouter from "../routers/AppRouter";
import { shallow, mount, configure } from "enzyme";

describe("<AppRouter/>", () => {
	it("renders 1 <App/> component", () => {
		shallow(<AppRouter />);
	});
});
