import React from "react";
import { render } from "@testing-library/react";
import { Menu } from "./Menu";

test("renders Menu", () => {
	const { getByText } = render(<Menu />);
	const settings = getByText(/Settings/i);
	expect(settings).toBeInTheDocument();
});
