import { render, screen } from "@testing-library/react";
import RestaurantCards, { withIsOpenLabel } from "../src/components/Restaurant/RestaurantCards";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("should render restaurant card components with prop data", () => {
    render(<RestaurantCards ResData={MOCK_DATA} />);

    const resName = screen.getByText("The Kalari House");

    expect(resName).toBeInTheDocument();
});