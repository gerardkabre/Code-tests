import { Stack } from "./stack";

describe("Stack exercise", () => {
  test("a", () => {
    const stack = new Stack();

    expect(stack.store).toEqual({ lastItemIndex: 0, values: {} });

    stack.push("first");

    expect(stack.peek()).toBe("first");
  });

  test("b", () => {
    const stack = new Stack();

    stack.push("first");
    stack.push("second");
    stack.push("third");
    stack.push("fourth");

    expect(stack.peek()).toBe("fourth");
  });

  test("c", () => {
    const stack = new Stack();

    stack.push("first");
    stack.push("second");
    stack.push("third");
    stack.push("fourth");

    const val = stack.pop();

    expect(val).toBe("fourth");

    expect(stack.peek()).toBe("third");
  });
  test("c", () => {
    const stack = new Stack();

    stack.push("first");
    stack.push("second");
    stack.push("third");
    stack.push("fourth");

    const val = stack.pop();
    expect(val).toBe("fourth");

    const val2 = stack.pop();
    expect(val2).toBe("third");

    const val3 = stack.pop();
    expect(val3).toBe("second");

    expect(stack.peek()).toBe("first");

    stack.push("new");

    expect(stack.peek()).toBe("new");
  });
});
