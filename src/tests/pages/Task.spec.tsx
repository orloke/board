import { render, screen } from "@testing-library/react";
import Task, { getServerSideProps } from "../../pages/board/[id]";
import { getSession } from "next-auth/react";

jest.mock("firebase/firestore", () => {
	return {
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
		doc: () => null,
		getFirestore: () => null,
	};
});

jest.mock("firebase/app", () => {
	return {
		initializeApp: () => null,
	};
});

const docSnap = {
	id: "2",
	nome: "carlos",
	created: "5 de outubro",
	tarefa: "Lavar a casa",
	userId: "1",
}

describe("Board Page", () => {
	it("render correctly", () => {
		render(<Task docSnap={docSnap}/>);
		expect(screen.getByText("Lavar a casa")).toBeInTheDocument();
	});
})