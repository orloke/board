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
				docs: [
          { 
            id: 1, 
            data: () =>{
              return{
                donate: true,
                lastDonated: new Date('2022-10-03T18:25:26.024Z'),
                image: "string",
              }
            }    
          }
        ],
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
			id: "1",
			donate: true,
			lastDonated: new Date('2022-10-03T18:25:26.024Z'),
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
    const responseJSON = JSON.parse(response as any);
		expect(responseJSON).toEqual(      [
      {
        id: '1',
        donate: true,
        lastDonated: new Date('2022-10-03T18:25:26.024Z') ,
        image: 'string'
      }
    ]);
    
	});
});
