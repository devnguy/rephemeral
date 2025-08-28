import { expect, vi, describe, it } from "vitest";
import Stack from "./stack";

// Leaving this here as a note:
// Disables a package that checks that code is only executed on the server side.
// Also, this mock can be defined in the Vitest setup file.
// Test functions that import server-only
vi.mock("server-only", () => {
  return {};
});

describe("Stack", () => {
  const item = {
    id: 1,
    foo: "hello",
  };
  const item2 = {
    id: 2,
    foo: "hello",
  };

  type Item = typeof item;

  it("pushes the given item", () => {
    const stack = new Stack<Item>();
    stack.push(item);
    expect(stack.items.length).toEqual(1);
  });

  it("returns the popped item", () => {
    const stack = new Stack<Item>([item]);
    stack.push(item2);
    const popped = stack.items.pop();
    if (popped === undefined) {
      throw new Error("popped is undefined");
    }
    expect(stack.items.length).toEqual(1);
    expect(popped.id).toEqual(2);
  });

  it("returns undefined if the stack is empty", () => {
    const stack = new Stack<Item>();
    const popped = stack.items.pop();
    expect(stack.items.length).toEqual(0);
    expect(popped).toBeUndefined();
  });
});
