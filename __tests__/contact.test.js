import { render, screen } from '@testing-library/react';
import Contact from '../src/components/Contact';
import "@testing-library/jest-dom";


describe("Contact US Page Test Cases", () => {
    it("Should load heading in contact component", () => {
        render(<Contact />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    it("Should load button inside contact component", () => {
        render(<Contact />);

        const button = screen.getByText("Submit");

        expect(button).toBeInTheDocument();
    });

    it("Should load 2 inputs inside contact component", () => {
        render(<Contact />);

        // Quering
        const inputBoxes = screen.getAllByRole("textbox");

        // Assertions
        expect(inputBoxes.length).toBe(2);
    });
});