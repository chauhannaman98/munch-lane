import Header from "../src/components/Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../src/utils/redux/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should load header component with login button", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header />
            </Provider>
        </BrowserRouter>

    );
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeInTheDocument();

});

it("Should load header component with cart button", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header />
            </Provider>
        </BrowserRouter>

    );

    // /Cart/ is regex pattern to test
    const cartButton = screen.getByText(/Cart/);

    expect(cartButton).toBeInTheDocument();

});

it("Should change login button to logout on click", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore} >
                <Header />
            </Provider>
        </BrowserRouter>

    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(logoutButton).toBeInTheDocument();

});