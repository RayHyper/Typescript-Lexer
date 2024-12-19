## Run Locally

Clone the project

```bash
  git clone https://github.com/RayHyper/Typescript-Lexer.git
```

Go to the project directory

```bash
  cd Typescript-Lexer
```

```bash
   deno run lexer.ts
```


## Usage

The lexer reads input from a text file and outputs the tokens.
Here is an example:

```typescript
// Contents of test.txt:
let average = (89+34+84) / 3

// Run the lexer:
deno run lexer.ts

// Output:
{ value: "let", type: 6 }       // Let keyword
{ value: "average", type: 1 }   // Identifier
{ value: "=", type: 2 }         // Equals
{ value: "(", type: 3 }         // OpenParen
{ value: "89", type: 0 }        // Number
{ value: "+", type: 5 }         // BinaryOperator
{ value: "34", type: 0 }        // Number
{ value: "+", type: 5 }         // BinaryOperator
{ value: "84", type: 0 }        // Number
{ value: ")", type: 4 }         // ClosePare
{ value: "/", type: 5 }         // BinaryOperator
{ value: "3", type: 0 }         // Number
```
