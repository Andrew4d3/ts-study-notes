# Objects

## Object Literal Types
```ts
// Inline object type in function parameter
function logSaiyan(saiyan: { name: string; power: number }) {
  console.log(`${saiyan.name} has power level: ${saiyan.power}!`);
  // ...
}

// Or define the type separately first (preferred)
type Saiyan = {
  name: string;
  power: number;
};

function logSaiyan(saiyan: Saiyan) {
  console.log(`${saiyan.name} has power level: ${saiyan.power}!`);
  // ...
}
```

**Explanation:** Object literal types let you describe the shape of an object — its property names and their types. You can either inline the type directly in the function signature or define a named `type` alias first. TypeScript will catch misspelled property names at compile time, unlike JavaScript which only fails at runtime.

---

## Extra Properties
```ts
type Spaceship = {
  name: string;
  speed: number;
};

// Passing a variable with extra properties is fine
const falcon = { name: "Millennium Falcon", speed: 75, weapons: 4 };
function pilot(ship: Spaceship) { ... }
pilot(falcon); // OK — excess properties allowed via variable

// But passing an object literal directly with extra properties errors
// Error: Object literal may only specify known properties, and 'weapons' does not exist
pilot({ name: "Millennium Falcon", speed: 75, weapons: 4 });
```

**Explanation:** TypeScript allows a variable holding extra properties to be passed to a function expecting a specific type (structural typing). However, when you pass an **object literal directly**, TypeScript performs **excess property checking** and throws an error for any unknown properties.

---

## Optional Object Properties
```ts
type Superhero = {
  name: string;
  strength: number;
  cape?: boolean; // cape is optional → type is boolean | undefined
};

// Avoid overusing optional props — prefer required fields
// Only use ? when the property truly may not exist
function fight(superhero: Superhero) {
  if (!superhero.cape) {
    // contact edna mode
  }
  // do the happy path thing
}
```

**Explanation:** Adding `?` after a property name makes it optional. TypeScript treats the property's type as `T | undefined`. This is useful but should be used sparingly — prefer requiring all fields that *should* be there to avoid excessive runtime `undefined` checks.

---

## Empty Object Type
```ts
// Don't do this — TypeScript infers newUser as type {}
let newUser = {};
newUser.name = "Lane"; // Error: Property 'name' does not exist on type '{}'

// {} allows reassignment to anything except null or undefined
let newUser = {};
newUser = "Lane"; // Fine!

// Instead, predefine with a proper type
type User = {
  name: string;
};

let newUser: User = {
  name: "Lane",
};
```

**Explanation:** The empty object type `{}` in TypeScript does *not* mean "an object with no properties." It means "anything that is not `null` or `undefined`." To model objects with specific fields, always declare a named type and initialize with the expected shape.

---

## Discriminated Unions
```ts
type MultipleChoiceLesson = {
  kind: "multiple-choice"; // Discriminant property
  question: string;
  studentAnswer: string;
  correctAnswer: string;
};

type CodingLesson = {
  kind: "coding"; // Discriminant property
  studentCode: string;
  solutionCode: string;
};

type Lesson = MultipleChoiceLesson | CodingLesson;

function isCorrect(lesson: Lesson): boolean {
  switch (lesson.kind) {
    case "multiple-choice":
      return lesson.studentAnswer === lesson.correctAnswer;
    case "coding":
      return lesson.studentCode === lesson.solutionCode;
  }
}
```

**Explanation:** A **discriminated union** uses a shared "tag" property (like `kind`) with literal string values to distinguish between object types in a union. TypeScript narrows the type inside each `switch`/`case` branch, ensuring type-safe access to the right properties. Adding a new variant forces you to handle all cases.

---

## Sets
```ts
// A Set that contains only strings
const justiceLeague = new Set<string>();
justiceLeague.add("Green Arrow");
justiceLeague.add("Flash");
justiceLeague.add(2); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// Convert an array to a Set (removes duplicates automatically)
const names = ["plasticman", "firestorm", "plasticman"];
const justiceLeague = new Set<string>(names);
console.log(justiceLeague); // Set { 'plasticman', 'firestorm' }

// Useful Set methods
justiceLeague.delete("Blue Beetle");
justiceLeague.has("Blue Beetle"); // false
justiceLeague.forEach((member) => console.log(member));
console.log(justiceLeague.size); // number of unique items
```

**Explanation:** TypeScript's `Set<T>` is a collection of unique values of a single type. The type parameter `<T>` enforces what goes in. Sets use `.size` (not `.length`) and provide `.add()`, `.delete()`, `.has()`, and `.forEach()`. Converting an array to a Set is a quick way to deduplicate values.

---

## Maps
```ts
// A Map with string keys and number values
const podracerSpeeds = new Map<string, number>();
podracerSpeeds.set("Anakin Skywalker", 947);
podracerSpeeds.set("Sebulba", 941);
podracerSpeeds.set("R2-D2", true); // Error: 'true' not assignable to 'number'

// Iterating over a Map
for (const [racer, speed] of podracerSpeeds) {
  console.log(`${racer} raced at ${speed} speed`);
}

// Key methods
podracerSpeeds.get("Sebulba"); // 941
podracerSpeeds.has("Sebulba"); // true
podracerSpeeds.delete("Sebulba");
podracerSpeeds.get("Sebulba"); // undefined
console.log(podracerSpeeds.size); // 2
```

**Explanation:** TypeScript's `Map<K, V>` is a typed key-value store. The two type parameters enforce the key type and value type separately. Like Sets, Maps use `.size` instead of `.length`. The main methods are `.set()`, `.get()`, `.has()`, and `.delete()`. Maps are iterable with destructured `[key, value]` pairs.

---

## Dynamic Keys
```ts
// Index signature — allows any string key with number values
type UserMetrics = {
  [key: string]: number;
};

const metrics: UserMetrics = {
  wordsPerMinute: 50,
  errors: 2,
  timeOnPage: 120,
};

metrics["refreshRate"] = 60; // OK
metrics["theme"] = "dark";   // Error: Type 'string' is not assignable to type 'number'
```

**Explanation:** An **index signature** (`[key: string]: ValueType`) lets you define an object type that can hold any number of properties, as long as the keys are of a specified type and the values match the declared type. This is useful for dictionaries/maps modeled as plain objects when the keys aren't known ahead of time.

---

## Dynamic Default Properties
```ts
// Mix of required properties and a dynamic index signature
type FormData = {
  [field: string]: string;
  email: string;    // required
  password: string; // required
};

// Another example with a union value type
type FormData = {
  [field: string]: string | number | boolean;
  email: string;
  password: string;
  age: number;
};
```

**Explanation:** You can combine a dynamic index signature with specific required properties in the same type. The required properties must be compatible with (i.e., assignable to) the index signature's value type. This pattern enforces that certain fields always exist, while still allowing any number of additional fields. Avoid overusing this — prefer optional `?` properties when the extra keys are known.

---

## PropertyKey
```ts
// Built-in TypeScript type
type PropertyKey = string | number | symbol;

// Using PropertyKey in an index signature
type InfrastructureTags = {
  [key: PropertyKey]: any;
};

const janesServer: InfrastructureTags = {
  name: "Jane's Server",  // string key
  1: 420,                  // number key
  [Symbol("role")]: "Admin", // symbol key
};

// Access symbol-keyed properties with bracket notation only
const ROLE = Symbol("role");
const user = { [ROLE]: "Admin" };
user[ROLE]; // "Admin"
// user.ROLE; // undefined — dot notation won't work for symbols
```

**Explanation:** `PropertyKey` is a built-in TypeScript type equivalent to `string | number | symbol` — all valid JavaScript object property key types. Using it in an index signature is more permissive than `string` alone. Symbols are unique, immutable values often used as guaranteed-unique property keys; they must be accessed via bracket notation.

---

## Readonly Modifier
```ts
type Point = {
  readonly x: number; // cannot be reassigned after initialization
  y: number;          // mutable
};

const point: Point = { x: 10, y: 20 };
point.y = 30; // OK
point.x = 15; // Error: Cannot assign to 'x' because it is a read-only property
```

**Explanation:** The `readonly` modifier on an object property prevents reassignment after the object is created — similar to `const` but scoped to individual properties instead of the whole variable. Use `readonly` for properties that should never change. Prefer it over rebuilding whole objects unnecessarily, but remember that `const` variables are usually the simpler default choice.

---

## "As Const" and Object.freeze
```ts
// as const — makes all values readonly literal types (compile-time)
const colorsConst = ["red", "green", "blue"] as const;
colorsConst.push("yellow"); // Error: Property 'push' does not exist on type 'readonly [...]'

const configConst = {
  apiUrl: "https://api.cobrakai.com",
  admins: { johnny: "lawrence", daniel: "larusso" },
  features: ["no mercy", "not crying", "winning too much"],
} as const;
// All nested properties are deeply readonly at compile-time

// Object.freeze() — prevents top-level mutations at runtime
const frozenConfig = Object.freeze({
  apiUrl: "https://api.cobrakai.com",
  admins: { johnny: "lawrence", daniel: "larusso" },
});
frozenConfig.apiUrl = "https://api.karate.com"; // Error at compile-time
frozenConfig.admins.johnny = "kreese"; // Fine! — nested objects are NOT frozen
```

**Explanation:** `as const` creates a deeply readonly type at compile-time, narrowing all values to their literal types. `Object.freeze()` is a runtime JavaScript function that prevents top-level property mutations, but does **not** affect nested objects. For full immutability (both compile-time and runtime, including nested), use both together.

---

## Satisfies
```ts
type ColorMap = {
  red: string | number;
  green: string | number;
  blue: string | number;
  yellow: string | number;
};

// Using `satisfies` — validates against type but keeps narrowed inference
const colorsSatisfies = {
  red: "#ff0000",
  green: "#00ff00",
  blue: 255,
  yellow: "#ffff00",
  // Error: "yelow" is not in type ColorMap (catches typo)
  yelow: "#ffff00",
} satisfies ColorMap;

// Narrowed types are preserved
type RedHexSatisfies = typeof colorsSatisfies.red; // string (not string | number)
const redUpper = colorsSatisfies.red.toUpperCase(); // Works! → "#FF0000"
```

**Explanation:** The `satisfies` operator validates that a value matches a type without widening the inferred type. Unlike an explicit type annotation (which widens `.red` to `string | number`), `satisfies` keeps the more specific inferred type (just `string`). This gives you both typo-catching and the ability to call type-specific methods without type assertions.

---

## Function Overloads
```ts
// Overload signatures — declared above the implementation
function formatEmployeeMessage(employee: Employee): string;
function formatEmployeeMessage(
  employee: Employee,
  isNew: true,
  onBoardedDate: Date,
): string;

// Implementation signature — handles all valid combinations
function formatEmployeeMessage(
  employee: Employee,
  isNew?: boolean,
  onBoardedDate?: Date,
): string {
  if (!isNew) {
    return `Employee: ${employee.name}, Dept: ${employee.dept}`;
  }
  return `Employee: ${employee.name}, New: Yes, Onboarded: ${onBoardedDate}`;
}

// Valid calls
formatEmployeeMessage(employee);                          // OK
formatEmployeeMessage(employee, true, new Date());        // OK

// Invalid — no overload expects exactly 2 args
// Error: No overload expects 2 arguments
formatEmployeeMessage(employee, true);
```

**Explanation:** Function overloads let you define multiple valid call signatures for a single function. Each overload signature describes a permitted combination of argument types. The implementation signature (with the actual function body) must be compatible with all overloads but is not itself callable from outside. This constrains callers to only use valid combinations of arguments.