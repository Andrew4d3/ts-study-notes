# Unions

## L1: Unions
```ts
// userId is a string OR a number
let userId: string | number;
userId = "user_42";
userId = 42;

// Type narrowing with typeof
function safeSquare(val: string | number): number {
  if (typeof val === "string") {
    val = parseInt(val, 10);
    // now val is only a number
  }
  return val * val;
}

let result = safeSquare("5");
console.log(result); // 25

result = safeSquare(5);
console.log(result); // 25
```

**Explanation:** Union types use the pipe symbol (`|`) to allow a value to be one of several types. A really cool feature is "type narrowing" — when you use a `typeof` check inside a conditional, TypeScript automatically narrows the type within that block, so you can safely treat it as the narrowed type.

---

## L2: Optional Parameters
```ts
// Optional parameter with '?'
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Gandalf");           // "Hello, Gandalf!"
greet("Gandalf", "Wizard"); // "Hello, Wizard Gandalf!"

// Inside the function, title is: string | undefined
function greet(name: string, title?: string): string {
  // title is a string | undefined
}
```

**Explanation:** Optional parameters are marked with a `?` after the parameter name. There are two key rules: (1) optional parameters must come *after* all required parameters, and (2) an optional parameter automatically has `undefined` unioned onto its type — so `title?: string` behaves as `title: string | undefined` inside the function body.

---

## L3: Default Parameters
```ts
// Default parameter value
function newCharacter(name: string, role: string = "warrior"): string {
  return `${name} is a ${role}`;
}

console.log(newCharacter("Gandalf"));           // Gandalf is a warrior
console.log(newCharacter("Gandalf", "wizard")); // Gandalf is a wizard

// TypeScript infers the type from the default value
function countdown(start = 10): void {
  // start is a number
  console.log(`Counting down from ${start}...`);
}
```

**Explanation:** Default parameters provide fallback values when an argument is omitted. Unlike optional parameters, you do *not* need to mark them with `?` — the parameter is already implicitly optional. TypeScript also infers the parameter's type from the default value, so you don't need to specify it explicitly (unless you need to widen the type).

---

## L4: Literal Types
```ts
// Without literal types — direction can be ANY string (bad)
function move(direction: string) {
  // Implementation...
}

// With a literal type — direction can ONLY be "north"
function move(direction: "north") {
  // Implementation...
}
```

**Explanation:** Literal types let you constrain a variable or parameter to a specific, exact value rather than a broad type like `string` or `number`. A string can have an infinite number of values, but a literal type like `"north"` restricts it to exactly that one value. This is more precise than using enums and works as a lightweight alternative.

---

## L5: Value Unions
```ts
// Combining literal types with a union
function move(direction: "north" | "south" | "east" | "west") {
  // Implementation...
}

// Refactored into a reusable named type alias
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction) {
  // Implementation...
}
```

**Explanation:** Value unions combine literal types with the `|` operator to allow a parameter to accept one of several specific values — effectively creating a compile-time "enum-like" constraint. Extracting the union into a named `type` alias (e.g., `type Direction = ...`) makes it reusable across multiple functions and keeps the code clean.

---

## L6: Template Literal Types
```ts
// Base union types
type Class = "wizard" | "warrior" | "rogue";

// Template literal type using Class
type Hero = `elf ${Class}`;
// Equivalent to: "elf wizard" | "elf warrior" | "elf rogue"

// Combining two union types — all combinations are generated
type Race = "elf" | "human" | "dwarf";
type Hero = `Hero: ${Race} ${Class}`;
// Produces: "Hero: elf wizard" | "Hero: elf warrior" | ... (9 combinations)

// Pattern matching with template literals
type LogRecord = `${string}: ${number}`;

const criticalErr: LogRecord = "CRITICAL: 69";  // valid
// const criticalErr: LogRecord = "CRITICAL 92";  // invalid (missing colon)
// const criticalErr: LogRecord = "92: CRITICAL"; // invalid (wrong order)
```

**Explanation:** Template literal types use backtick syntax to build new string literal types by embedding other types. When a union type is embedded in a template, TypeScript automatically expands it into all possible combinations. They can also enforce simple string patterns (e.g., `${string}: ${number}`) making them a powerful tool for type-safe string formatting.

---

## L7: Giant Unions
```ts
// This explodes into hundreds of thousands of combinations:
type Distance = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Class = "Warrior" | "Rogue" | "Mage" | "Cleric" | "Paladin" | "Druid" | "Hunter" | "Shaman";
type MoveMessage =
  `The ${Class} moves ${Distance}, ${Distance}, ${Distance}, ${Distance}, then ${Distance}`;
// Error: Union type too complex to represent.

// Even a smaller version still has 5,000+ combinations:
type MoveMessage =
  `The ${Class} moves ${Distance}, ${Distance}, then ${Distance} spaces.`;
```

**Explanation:** While template literal types are powerful, combining large union types can cause an explosion in the number of generated combinations, leading to a TypeScript compiler error: *"Union type too complex to represent."* This also degrades editor responsiveness and compilation speed. This pattern is sometimes called "Type Masturbation" in the TS community — a warning that you can over-engineer types to the point of hurting performance.