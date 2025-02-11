// printing to console
console.log("Hello, World!");

// this is a single line comment

/*
this is a
multi-line
comment
*/

// variables and constants
let x; // variable declaration
x = 10; // variable assignment
let y = 20; // variable declaration and initialization
const C = 100; // constant declaration and assignment
var z = 30; // variable declaration and assignment (old way)
// JavaScript uses camelCase for variable names as a convention

// primitive data types
let n = 10; // number (integer)
let f = 1.5; // number (float)
let lol = 0.1 + 0.2; // floating-point arithmetic
let s = "Hello"; // string
let bool = true; // boolean
let na = null; // null
let un = undefined; // undefined

console.log(typeof n); // get the type of a variable

// increment and decrement integers
let i = 10;
i = i + 1; // increment
i += 1; // increment
i++; // postfix increment
++i; // prefix increment
// similarly for decrement

// string manipulation (strings are immutable)
// prettier-ignore
let one = 'one'; // single quotes
let two = "two"; // double quotes
let three = `${one} and ${two} is three`; // string interpolation/template literals (backticks)
let alsoThree = one + " and " + two + " is three"; // string concatenation

let greeting = "Hello";
let l = greeting.length; // get the length of a string
let firstChar = greeting[0]; // indexing
let lastChar = greeting[greeting.length - 1]; // indexing
let subString = greeting.slice(1, 3); // slicing

let userInput = "  My name is JOHN  ";
let userName = "John";
userInput = userInput.trim(); // remove leading and trailing whitespaces
userInput = userInput.toUpperCase(); // convert to uppercase
userInput = userInput.toLowerCase(); // convert to lowercase
let isJohn = userInput.includes("john"); // check if a string contains a substring
let johnIndex = userInput.indexOf("john"); // get the index of a substring
let padded = userName.padStart(10, "*"); // pad the string with a character
let repeated = userName.repeat(3); // repeat the string

let longGreeting = "Hello\nWorld"; // escape characters
console.log(longGreeting);

// operators

// arithmetic operators
10 + 20; // addition
20 - 10; // subtraction
10 * 20; // multiplication
20 / 10; // division
20 % 3; // modulus
-10; // negation
2 ** 3; // exponentiation

// logical operators
true && false; // AND
true || false; // OR
!true; // NOT

// comparison operators
10 === 10; // equal to (strict equality)
10 !== 20; // not equal to
20 > 10; // greater than
10 < 20; // less than
10 >= 10; // greater than or equal to
20 <= 20; // less than or equal to

// type coercion (JavaScript is a weakly typed language)
10 + "20"; // 1020  (number to string)
"10" - 5; // 5 (string to number)
10 + true; // 11 (boolean to number)
10 == "10"; // true (loose equality)
"" == 0; // true

// truthy and falsy values
10; // truthy
0; // falsy
("Hello"); // truthy
(""); // falsy
true; // truthy
false; // falsy
null; // falsy
undefined; // falsy

a = 10;
b = 0;
!!a; // convert to boolean

// truthy operations
a && b; // b (if a is truthy, return b)
a || b; // a (if a is truthy, return a)

// compound data types
// arrays (arrays are mutable)
let arr = [1, 2, 3, "four", true];
let firstElement = arr[0]; // indexing
arr[0] = 10; // updating an element
let len = arr.length; // get the length of an array
let mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]; // multi-dimensional array
let middleElement = mat[1][1]; // indexing
let firstTwoRows = mat.slice(0, 2); // slicing

let languages = [];
languages.push("Python"); // add an element at the end
languages.push("JavaScript");
languages.unshift("C++"); // add an element at the beginning
let js = languages.pop(); // remove the last element
let cpp = languages.shift(); // remove the first element

let arr1 = [1, 2];
let arr2 = [3, 4];
let arr3 = arr1.concat(arr2); // concatenate arrays (arr1+arr2 returns a string)

let colors = ["red", "green", "blue"];
colors.indexOf("green"); // get the index of an element (returns the index of the first occurrence or -1 if not found)

let fruits = ["apple", "banana", "mango"];
let fruitsStr = fruits.join(" & "); // convert an array to a string

let nums = [1, 2, 3, 4, 5];
nums.includes(3); // check if an element exists in an array
let reversed = nums.reverse(); // reverse an array
let sorted = nums.sort(); // sort an array
let sliced = nums.slice(1, 3); // slice an array (returns a new array)
let numsCopy = nums.slice(); // copy an array (shallow copy)
let spliced = nums.splice(1, 2); // remove elements from an array starting from an index

// objects (key-value pairs)
// objects are mutable
let obj = { name: "John", age: 30 }; // object literal (keys are strings)
let obj2 = { key1: 1, key_2: 2, "key 3": 3, "key#?4": 4 }; // need to use string literals if keys are not valid identifiers
let obj3 = new Object(); // object constructor

// accessing object keys (properties)
let name = obj.name; // dot notation
let age = obj["age"]; // bracket notation
obj["name"] = "Jane"; // updating object properties
obj.city = "New York"; // adding new properties
delete obj.city; // deleting object properties

// object methods (Object is a constructor function and has static methods)
let keys = Object.keys(obj); // get the keys of an object
let values = Object.values(obj); // get the values of an object
let keyValues = Object.entries(obj); // get the key-value pairs of an object
let dest = {};
let src1 = { a: 1, b: 2 };
let src2 = { b: 3, c: 4 };
Object.assign(dest, src1, src2); // merge objects (shallow copy)

// nested objects and arrays
// nesting objects inside an array
let people = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

// nesting arrays and objects inside an object
let p = {
  name: "John",
  age: 30,
  languages: ["Python", "JavaScript"],
  address: { city: "New York", country: "USA" },
};
console.log(JSON.stringify(p, null, 2)); // convert an object to a JSON string

// control structures (conditionals and loops)
// if-else statement
let num = 10;
if (num > 0) {
  console.log("Positive");
} else if (num < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}
// if conditions are too complex, they can be declared as variables before the
// if statement.
// it's possible to omit the curly braces if there is only one statement in the
// block.

// switch statement
let day = "Sunday";
switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("End of the week");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Midweek");
}

// ternary operator
let isPositive = num > 0 ? true : false;

// loops (loop variable initialization -> conditional test -> update loop
// variable)

// while loop
let speed = 55;
while (speed > 35) {
  console.log(speed);
  speed -= 5;
}
// beware of infinite loops

// for loop
console.log("Counting to 10");
for (let i = 0; i < 11; i++) {
  console.log(i);
}
// variable i is scoped to the loop block and is not accessible outside the loop

// for-of loop (iterate over the elements of an array)
let veggies = ["carrot", "potato", "onion"];
for (let veg of veggies) {
  console.log(veg);
}

for (let i = 0; i < veggies.length; i++) {
  console.log(veggies[i]);
}

for (let [index, veg] of veggies.entries()) {
  console.log(index, veg);
}

let RGBColors = ["red", "green", "blue"];
let [red, green, blue] = RGBColors; // destructuring assignment

// for-in loop (iterate over the properties of an object)
let person = { name: "John", age: 30 };
for (let key in person) {
  console.log(key, person[key]);
}

// functions

// function declaration
function sayHello(name) {
  console.log(`Hello, ${name}!`); // returns undefined
}

function add(a, b) {
  return a + b; // returns the sum of a and b
}

// calling a function
greet("John");

// some function side effects

// logging to the console
function addLog(a, b) {
  console.log(a + b);
}

// modifying global variables
let numCalls = 0;
function addCalls(a, b) {
  numCalls++;
  return a + b;
}

// functions as first-class citizens
// functions can be passed as arguments to other functions
function greet(name, callback) {
  return callback(name);
}
greet("John", sayHello);

// other function syntaxes

// functions can be assigned to variables (function expressions)
// anonymous function expression
let sayHi = function (name) {
  return `Hi, ${name}!`;
};

// named function expression
let salute = function sayHi(name) {
  return `Hi, ${name}!`;
};
// sayHi is not accessible outside the function body

// function expressions are often used in contexts where functions are to be
// treated as values

// arrow functions (similar to lambda functions in Python)

// arrow functions with no parameters
let greet = () => "Hello, World!";

// arrow functions with one parameter
let saluteArrow = (name) => {
  return `Hi, ${name}!`;
};

// arrow functions short syntax
let saluteArrowShort = (name) => `Hi, ${name}!`; // implicit return
let addOne = (x) => x + 1; // f = lambda x: x + 1 in Python

// arrow functions with multiple parameters
let adder = (a, b) => a + b;

// arrow functions with multiple statements
let adderVerbose = (a, b) => {
  let sum = a + b;
  return sum;
};

// rest parameters
function sum(...nums) {
  let total = 0;
  for (let num of nums) {
    total += num;
  }
  return total;
}

// higher-order functions
// functions that take other functions as arguments or return functions

// function that takes a function as an argument
function greet(callback) {
  return callback();
}

greet(() => console.log("Hello, World!"));

// function that returns a function
function exclamator(exclamation, times) {
  function cheer(message) {
    message = message.toUpperCase();
    message += exclamation.repeat(times);
    return message;
  }
  return cheer;
}

let cheer = exclamator("!", 3);
let cheerfulMessage = cheer("Hello");
console.log(cheerfulMessage);

// closures
// a function that captures the environment in which it was created
function counter() {
  let count = 0;
  function inc() {
    count++;
    return count;
  }
  return inc;
}

let increment = counter();
console.log(increment());

// arrays methods with callbacks (forEach, map, filter, reduce)
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let doubledNumbers = [];
numbers.forEach((num) => {
  doubledNumbers.push(num * 2);
});
let evenNumbers = numbers.filter((num) => num % 2 === 0);
let evenNumbersSquared = evenNumbers.map((num) => num ** 2);
let sumOfEvenNumbersSquared = evenNumbersSquared.reduce(
  (acc, num) => acc + num,
  0
);

// classes (OOP)
// classes are blueprints for creating objects
class Person {
  constructor(name, age) {
    // properties
    this.name = name;
    this.age = age;
  }

  // method
  greet() {
    return `Hello, ${this.name}!`;
  }
}

let john = new Person("John", 30); // create an instance of a class
console.log(john.greet());
console.log(`John is ${john.age} years old.`);

// inheritance
class Student extends Person {
  constructor(name, age, id) {
    super(name, age); // call the parent class constructor
    this.studentId = id;
  }

  study() {
    return `${this.name} is studying.`;
  }
}

let jane = new Student("Jane", 25, 10);

// instanceof operator
console.log(jane instanceof Student); // true
console.log(jane instanceof Person); // true

// prototype-based inheritance (JavaScript is a prototype-based language)
// class-based inheritance is syntactic sugar for prototype-based inheritance

// constructor function
function Cat(name, age) {
  this.name = name;
  this.age = age;
}

// prototype method
Cat.prototype.meow = function () {
  return `${this.name} says meow!`;
};

// create an instance of a constructor function
let tofu = new Cat("Tofu", 2);
console.log(tofu.meow());

tofu.__proto__; // access the prototype of an object
tofu.hasOwnProperty("name"); // check if an object has a property
tofu.__proto__.hasOwnProperty("meow"); // check if an object has a method
tofu.hasOwnProperty("meow"); // false (meow is a prototype method)

// overriding prototype methods (shadowing)
tofu.meow = function () {
  return "Meow!";
};
console.log(tofu.meow());
tofu.hasOwnProperty("meow"); // true (meow is now an own property)

// prototype chain
// objects inherit properties and methods from their prototype
// the prototype itself is an object and has its own prototype
// the prototype chain is a series of objects linked together that ends with
// Object.prototype
// any object that isn't created with a constructor function has
// Object.prototype as its prototype
