import { render, screen } from "@testing-library/react";
import { getServerSideProps } from "../../pages/board";
import Board from "../../pages/board";
import { getSession } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("firebase/firestore", () => {
	return {
		query: () => null,
		collection: () => null,
		getDocs: () => {
			return {
				docs: [
					{
						id: 1,
						data: () => {
							return {
								created: {
									toDate: () => new Date("2022-10-03T18:25:26.024Z"),
								},
							};
						},
					},
				],
			};
		},
		getFirestore: () => null,
		where: () => null,
		orderBy: () => null,
	};
});

jest.mock("firebase/app", () => {
	return {
		initializeApp: () => null,
	};
});

const user = {
	name: "junior",
	id: "1",
	vip: true,
	lastDonate: new Date("2022-10-03T18:25:26.024Z"),
};

const data = [
	{
		id: "2",
		nome: "carlos",
		created: "3 de outubro",
		tarefa: "nada",
		userId: "1",
	},
];

describe("Board Page", () => {
	it("render correctly", () => {
		render(<Board data={data} user={user} />);
		expect(screen.getByText("Você tem 1 tarefa")).toBeInTheDocument();
	});

	it("redirect user if not subscription is found", async () => {
		(getSession as jest.Mock).mockReturnValueOnce(null);
		const response = await getServerSideProps({} as any);
    expect(response).toEqual({ redirect: { destination: '/', permanent: false } });
	});

	it("redirect user if subscription is found", async () => {
		(getSession as jest.Mock).mockReturnValue({
			user: {
				name: "junior",
			},
			token: {
				sub: "fake-sub",
			},
			vip: true,
			lastDone: new Date("2022-10-03T18:25:26.024Z"),
		});

		const response = (await getServerSideProps({} as any)) as any;

		expect(response).toEqual({
			props: {
				user: {
					name: "junior",
					id: "fake-sub",
					vip: true,
					lastDonate: undefined,
				},
				data: [{
          id: 1,
          created: "03 October 2022",
        }],
			},
		});
	});
  
});
