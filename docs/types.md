# Types

## Basic Types
```ts
const bootupMessage: string = "Starting support.ai servers...";
const port: number = 3000;
const isServerOnline: boolean = true;
const noValue: null = null;
const notDefined: undefined = undefined;

// Type mismatch causes a compile-time error:
// const bootupMessage: string = 123;
// Error: Type 'number' is not assignable to type 'string'.
```
**Explanation:** TypeScript uses `: type` annotations to enforce static typing on variables. The primitive types are `string`, `number`, `boolean`, `null`, and `undefined`. Assigning a value of the wrong type causes a compile-time error.

---

## Type Inference
```ts
// Explicit (unnecessary):
const bootupLog: string = "Starting support.ai servers...";

// Inferred (preferred):
const bootupLog = "Starting support.ai servers...";
```
**Explanation:** TypeScript can automatically infer the type of a variable from its assigned value, so you rarely need to write explicit type annotations. Prefer inferred types — they are equally safe and require less typing.

---

## What Is TypeScript
```ts
// TypeScript compiles to JavaScript via the `tsc` compiler.
// If there's a type error, compilation fails:
// tsc: Type 'string' is not assignable to type 'number'.

const supportAiPort: number = 3000;
console.log(`Starting server on port ${supportAiPort}...`);
console.log(`The type of supportAiPort is ${typeof supportAiPort}`);
```
**Explanation:** TypeScript is not natively supported by JS engines — it must be compiled by `tsc` into JavaScript first. Type errors are caught at compile time, before the code runs. The goal is compatibility and safety, not performance.

---

## Any
```ts
// Avoid `any` — it opts out of type checking entirely:
const systemPrompt: any = "Help the customer..."; // bad

// Prefer inferred specific types:
const systemPrompt = "Help the customer...";      // string ✅
const tokenLimit = 1000;                          // number ✅
const hasAdminAccess = true;                      // boolean ✅
```
**Explanation:** The `any` type disables TypeScript's type checking for a variable, making it the most useless type from a safety perspective. It's mainly useful when migrating JS codebases to TS, but should be replaced with proper types over time.