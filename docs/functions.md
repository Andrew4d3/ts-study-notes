# Functions

## L1: Function Type Syntax
```ts
// Named function with typed parameters and return type
function createMessage(name: string, a: number, b: number): string {
  return `${name} scored ${a + b}`;
}

// Arrow function equivalent
const createMessage = (name: string, a: number, b: number): string => {
  return `${name} scored ${a + b}`;
};
```

**Explanation:** The `: type` annotation after each parameter specifies that parameter's type. The `: type` after *all* the parameters (before the function body) specifies the return type. This syntax works identically for both regular functions and arrow functions.

---

## L2: Inferred Return Types
```ts
// Explicit return type (verbose)
function divide(a: number, b: number): number {
  return a / b;
}

// Inferred return type (preferred for return types)
function divide(a: number, b: number) {
  return a / b;
}
```

**Explanation:** TypeScript can automatically infer a function's return type from the value that is returned. While explicit types are recommended for parameters, it is generally better practice to let TypeScript infer return types — it reduces verbosity and TypeScript will still catch type errors if you return the wrong type.

---

## L3: Void
```ts
function logMessage(message: string): void {
  console.log(message);
  // nothing is returned here!
}
```

**Explanation:** The `void` type represents the return value of functions that *don't* return a value. In JavaScript a function without a `return` statement returns `undefined` by default, which is vague. TypeScript uses `void` to explicitly communicate the *intent* that a function returns *nothing*.

---

## L4: Function Types
```ts
// Function type syntax
(param1: type1, param2: type2, ...) => returnType

// Example: a type for a function that takes two numbers and returns a number
(a: number, b: number) => number;

// Both of these functions are of that type
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
```

**Explanation:** Functions in JavaScript/TypeScript are values, so they have types too. A function's type includes information about its parameter types and its return type, written in arrow-function style. This is useful when passing functions as arguments to other functions (higher-order functions).

---

## L5: Type Alias
```ts
// Without a type alias — verbose and hard to reuse
function setLoggerTimeout(
  loggerCallback: (s1: string, s2: string) => string,
  delay: number,
) {
  // do something
}

// Create a type alias with the `type` keyword
type LoggerCallback = (s1: string, s2: string) => string;

// Now the signature is clean and reusable
function setLoggerTimeout(loggerCallback: LoggerCallback, delay: number) {
  // do something
}
```

**Explanation:** The `type` keyword lets you create a named alias for any type, including complex function types. Type aliases make signatures easier to read, less error-prone to copy, and easier to update — you only need to change the definition in one place.

---

## L6: Importing Types
```ts
// Regular import — works but less efficient
import { User, Post } from "./models";

// Preferred: import type syntax
import type { User, Post } from "./models";

// Also valid: inline type keyword per import
import { type User, type Post } from "./models";
```

**Explanation:** Using `import type` tells TypeScript that you are only importing types, not runtime values. This allows the compiler to safely drop those imports during compilation so they generate no extra JavaScript code, reducing bundle size. The `import type { ... }` form is generally preferred over the inline `{ type X }` form for conciseness.