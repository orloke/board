import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";

// jest.mock("firebase/firestore", () => {
// 	return {
// 		query: () => null,
// 		collection: () => null,
// 		getDocs: () => null,
// 		getFirestore: () => null,
// 	};
// });

jest.mock("firebase/firestore", () => {
	return {
		query: () => null,
		collection: () => null,
		getDocs: () => {
			return {
				docs: [{ id: 1, data: () =>{return{j: 'oi'}}, }],
			};
		},
		getFirestore: () => null,
	};
});

jest.mock("firebase/app", () => {
	return {
		initializeApp: () => null,
	};
});

JSON.parse = jest.fn().mockImplementation(() => {
	return [
		{
			id: "11111",
			donate: true,
			lastDonated: new Date(),
			image: "string",
		},
	];
});

describe("Home Page", () => {
	it("render correctly", () => {
		render(<Home users="junior" />);
		expect(screen.getByText("e online")).toBeInTheDocument();
	});

	it("render correctly image", () => {
		render(<Home users="junior" />);
		expect(screen.getByAltText("Usuário doador")).toBeInTheDocument();
	});

	it("render correctly initial data", async () => {
		const response = await getStaticProps({});
		expect(response).toEqual({ props: { users: '[{"id":1,"j":"oi"}]' }, revalidate: 3600 })
	});
});
