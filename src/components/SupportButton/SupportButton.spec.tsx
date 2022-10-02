import { render, screen } from "@testing-library/react";
import { SupportButton } from ".";

describe("Layout", () => {
	it("render SupportButton component", () => {
		render(<SupportButton />);
		expect(screen.getByText("Apoiar")).toBeInTheDocument();
	});
})