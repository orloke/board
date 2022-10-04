import { render, screen } from "@testing-library/react";
import Task, { getServerSideProps } from "../../pages/board/[id]";
import { getSession } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("firebase/firestore", () => {
	return {
		getDoc: () => {
			return {
				then: () => {
					return {
						data:{
							id: 1,
							name: 'junior'
						},
						catch: () => {
							return{
								error: 'Deu algum erro'
							}
						},
					}
				},
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
};

describe("Board Page", () => {
	it("render correctly", () => {
		render(<Task docSnap={docSnap} />);
		expect(screen.getByText("Lavar a casa")).toBeInTheDocument();
	});

	it("loads initial date", async () => {
		(getSession as jest.Mock).mockReturnValue(null);

		const response = (await getServerSideProps({} as any)) as any;
		expect(response).toEqual({
			redirect: { destination: "/board", permanent: false },
		});
	});

	it("loads initial date", async () => {
		(getSession as jest.Mock).mockReturnValue({
			vip: true,
		});

		const response = (await getServerSideProps({} as any)) as any;
		console.log(response);
	});
});
