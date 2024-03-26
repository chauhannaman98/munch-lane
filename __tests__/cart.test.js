import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import RestaurantMenu from "../src/components/Restaurant/RestaurantMenu";
import Header from "../src/components/Header";
import Cart from "../src/components/Cart/Cart";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "../mocks/restaurantMenu.json";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../src/utils/redux/appStore";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA)
    })
});


it("should load restaurant menu items", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <RestaurantMenu />
            </Provider>
        </BrowserRouter>
    ));

    const accordianHeader = screen.getByText("Meals, Thalis and Bowls (9)");
    fireEvent.click(accordianHeader);

    const menuItems = screen.getAllByTestId("menu-item");

    expect(menuItems.length).toBe(9);
});

it("should add menu items to cart", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
                <RestaurantMenu />
                <Cart />
            </Provider>
        </BrowserRouter>
    ));

    fireEvent.click(screen.getByText("Meals, Thalis and Bowls (9)"));

    const addBtn = screen.getAllByRole("button", { name: "Add +" });

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();

    fireEvent.click(addBtn[0]);

    expect(screen.getByText("Cart (1)")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
});