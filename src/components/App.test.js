import React from "react";
import AppRouter from "../routers/AppRouter";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<AppRouter/>", () => {
	it("renders 1 <App/> component", () => {
		shallow(<AppRouter />);
	});
});
