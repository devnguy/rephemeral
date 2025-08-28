export class Stack<T> {
  items: Array<T>;

  constructor(items: Array<T> = []) {
    this.items = items;
  }

  /**
   * Pushes an item to the top of the stack.
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes an item from the stack, returning the removed item. Returns
   * undefined if the stack is empty.
   */
  pop(): T | undefined {
    if (this.items.length > 0) {
      const item = this.items[this.items.length - 1];
      this.items.splice(this.items.length - 1, 1);
      return item;
    }
    return undefined;
  }
}
