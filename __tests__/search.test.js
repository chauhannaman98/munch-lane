import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Body from "../src/components/Body";
import MOCK_DATA from "../mocks/restaurantListMock.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    });
});

describe("Search and Filter test cases", () => {

    beforeAll(() => {
        console.log("Runs before all the tests");
    });

    beforeEach(() => {
        console.log("Runs before each test");
    });

    afterAll(() => {
        console.log("After all");
    });

    afterEach(() => {
        console.log("After each test");
    });

    it("should render the body component with Search results", async () => {

        await act(async () => render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        ));

        const searchBtn = screen.getByRole("button", { name: "Search" });
        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, { target: { value: "indian" } });
        fireEvent.click(searchBtn);

        const cards = screen.getAllByTestId("resCards");

        expect(cards.length).toBe(5);
    });

    it("should render the body component with filter", async () => {

        await act(async () => render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        ));

        const topFilterBtn = screen.getByTestId("top-filter");

        fireEvent.click(topFilterBtn);

        const cards = screen.getAllByTestId("resCards");

        expect(cards.length).toBe(5);
    });
});