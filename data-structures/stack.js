/*
STACK
Abstract data type

LIFO - Last in, first out
Collection of elements with push and pop operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.
DO NOT use an array and the native push/pop method in your implementation. That's too easy, yeah? =P
Use an object as the underlying data structure.

*** Operations:
myStack.push(value)
=> count of stack
add value to collection

myStack.pop()
=> most recent element added collection
Remove item so that it is no longer in collection

myStack.peek()
=> most recent element added collection
Similiar to pop, but do not remove element from collection

myStack.count()
=> number of elements in stack

*** Additional Exercises:
Modify your stack to take a max capacity and return a string if you try to add an element when there's no more room:
myStack.push(value)
=> "Max capacity already reached. Remove element before adding a new one."
Create a contains method to check if a value is in the stack:
myStack.contains('findme')
=> true/false
 */

export function Stack(capacity) {
  this.values = {};
  this.lastItemIndex = 0;
  this.capacity = {
    max: capacity || null,
    max_message: "Max capacity reached",
  };
}

Stack.prototype.push = function (value) {
  if (this.validateMaxCapacity()) return this.capacity.max_message;

  const newLastItemIndex = this.lastItemIndex + 1;

  this.values[newLastItemIndex] = value;
  this.lastItemIndex = newLastItemIndex;

  return this.count();
};

Stack.prototype.pop = function () {
  const lastItem = this.values[this.lastItemIndex];

  if (!lastItem) return null;

  delete this.values[this.lastItemIndex];

  this.lastItemIndex = this.lastItemIndex - 1;

  return lastItem;
};

Stack.prototype.peek = function () {
  return this.values[this.lastItemIndex];
};

Stack.prototype.count = function () {
  return Object.keys(this.values || {}).length;
};

Stack.prototype.validateMaxCapacity = function () {
  if (!this.capacity.max) return false;

  return Object.keys(this.values).length >= this.capacity.max;
};

Stack.prototype.contains = function (valueToCheck) {
  return Object.values(this.values || {}).some(
    (value) => value === valueToCheck
  );
};
