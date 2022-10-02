import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Header } from ".";

jest.mock("next-auth/react", () => {
	return {
		useSession() {
			return {
				data: null,
			};
		},
	};
});
// jest.mock("next-auth/react")

describe("Header component", () => {

	it("render header component correctly", () => {
		render(<Header />);
		expect(screen.getByText("Home")).toBeInTheDocument();
	});
  
	it("render header component", () => {
		render(<Header />);
		expect(screen.getByAltText("Logo Meu board")).toBeInTheDocument();
	});
});
