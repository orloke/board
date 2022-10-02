import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Header } from ".";

jest.mock("next-auth/react")

describe("Header component", () => {
	it("renders correctly when signed out", async () => {
		(useSession as jest.Mock).mockReturnValueOnce({
			data: null,
			status: "unauthenticated",
		});

		render(<Header />);
		expect(screen.getByText("Entrar com Gitbub")).toBeInTheDocument();
    screen.debug()
	});

  // it("render header component", ()=> {
  //   render(<Header />);
	// 	expect(screen.getByText("Home")).toBeInTheDocument();
  // })
});

// jest.mock("next-auth/react", () => {
//   return{
//     useSession(){
//       return{
//         data: null,
//         status: 'unauthenticated'
//       }
//     }
//   }
// })