import { sum } from "../src/components/sum";

test("Sum function should calculate the sum of two numbers", () => {
    const result = sum(6, 4);

    // Assertion
    expect(result).toBe(10);
});