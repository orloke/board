import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react")

describe("Layout", () => {
  it("renders correctly when signed out", async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })

    render(<SignInButton />)
    expect(screen.getByText('Entrar com Gitbub')).toBeInTheDocument()
  })

  it("renders correctly when signed in", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "Junior",
        },
      },
      status: "authenticated",
    })

    render(<SignInButton />)
    expect(screen.getByTestId('component').textContent).toBe('Olá Junior')
  })
})