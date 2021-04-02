import { exercise } from "./candy";

describe("Candy exercise", () => {
  test("returns correct amount of candy", () => {
    expect(exercise([1, 0, 2])).toBe(5);
    expect(exercise([1, 2, 2])).toBe(4);
    expect(exercise([1, 2, 2, 3, 1])).toBe(7);
  });
});
