# Arrays

## L1: Arrays
```ts
// Bracket notation for declaring typed arrays
function trainJedi(jediKnights: string[]) {
  for (let knight of jediKnights) {
    console.log(`Training ${knight}...`);
  }
}

trainJedi(["Dooku", "Qui-Gon", "Xanatos"]);
// Training Dooku...
// Training Qui-Gon...
// Training Xanatos...
```

**Explanation:** The most common way to declare a typed array in TypeScript is using bracket notation — `string[]`, `number[]`, etc. The type before `[]` constrains every element in the array to that type.

---

## L2: Type Parameters
```ts
// Using bracket notation
function assignLightsaberColors(name: string, colors: string[]): void {
  // ...
}

// Using generic type parameter syntax — equivalent!
function assignLightsaberColors(name: string, colors: Array<string>): void {
  // ...
}

// Either syntax works for variable declarations too
const colors: string[] = ["blue", "green", "purple", "red", "orange", "white", "darksaber"];
const midichlorianCounts: Array<number> = [1000, 5000, 12000, 20000, 27000, 40000];
```

**Explanation:** TypeScript provides an alternative `Array<T>` (generic type parameter) syntax that is fully equivalent to the `T[]` bracket notation. Both are valid — `string[]` and `Array<string>` describe the same type. The `Array<T>` form will feel more consistent once you start working with other generics.

---

## L3: Heterogeneous Arrays
```ts
// TypeScript infers the type as (string | number)[]
let lightsaberStyles = [1, 2, "double", "shoto"];

function describe(style: string | number): string {
  console.log(`Wield ${style} lightsaber`);
}

lightsaberStyles.forEach(describe);
// Wield 1 lightsaber
// Wield 2 lightsaber
// Wield double lightsaber
// Wield shoto lightsaber
```

**Explanation:** Arrays in TypeScript can hold multiple types by using a union type annotation `(string | number)[]`. TypeScript will infer this automatically from a mixed array literal, or you can declare it explicitly. Use the pipe `|` to combine types in the array element type.

---

## L4: Rest Parameters
```ts
// Rest parameter: collects all trailing arguments into a typed array
function gatherParty(partyName: string, ...adventurers: string[]): string {
  return `${partyName} consists of: ${adventurers.join(", ")}`;
}

const msg = gatherParty("The Fellowship", "Frodo", "Sam", "Gandalf");
console.log(msg);
// "The Fellowship consists of: Frodo, Sam, Gandalf"
```

**Explanation:** Rest parameters (prefixed with `...`) allow a function to accept an indefinite number of arguments of the same type, collecting them into a typed array. The rest parameter must be the last parameter in the function signature. Note: `console.log` itself uses rest parameters internally.

---

## L5: Evolving Any
```ts
// Empty array — TypeScript infers as any[]
let inventory = [];
// inventory: any[]

inventory.push(42);
// inventory: number[]

inventory.push("robe");
// inventory: (number | string)[]

// If explicitly typed, pushing the wrong type causes an error
let inventory: number[] = [];
inventory.push("robe");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'

// "Evolving any" is useful across function scope boundaries
function getConfig() {
  let config = [];
  // config: any[]
  config.push("api-key");
  // config: string[]
  config.push(8080);
  // config: (string | number)[]
  return config;
}

let config = getConfig();
// config: (string | number)[]

config.push(false);
// Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'
```

**Explanation:** When you declare an empty array without a type annotation, TypeScript infers it as `any[]` — an "evolving any." As you push values in, the type evolves to match what's been added. Once the array leaves its initial scope (e.g., returned from a function), TypeScript locks the inferred type, so further pushes of incompatible types produce compile-time errors.