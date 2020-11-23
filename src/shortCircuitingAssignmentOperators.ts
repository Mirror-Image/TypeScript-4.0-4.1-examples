import {debug} from "webpack";

let a: number = 5;
let b: number = 2;

// Addition
// a = a + b
a += b;

// Subtraction
// a = a - b
a -= b;

// Multiplication
// a = a * b
a *= b;

// Division
// a = a / b
a /= b;

// Exponentiation
// a = a ** b
a **= b;

// Left Bit Shift
// a = a << b
a <<= b;


a = a && b;
a &&= b;

a = a || b;
a ||= b;

a = a ?? b;
a ??= b;


if (!a) {
  a = b;
}
// could be '
a ||= b;


let values: string[];

// Before
// (values ?? (values = [])).push('hello'); // error

// After
(values ??= []).push('hello'); // works

type Obj = {
  prop: string,
}

const obj: Obj = {
  prop: '',
};

// obj.prop ||= foo3('Hey', 2);
// // roughly equivalent to either of the following
//
// obj.prop || (obj.prop = foo3('hey', 2));
// // or
// if (!obj.prop) {
//   obj.prop = foo3('hey', 2);
// }

const obj2 = {
  get prop() {
    console.log('getter has run');

    // Replace me!
    return Math.random() < 0.5;
  },
  set prop(_val: boolean) {
    console.log('setter has run');
  }
};

function foo5() {
  console.log('right side evaluated');
  return true;
}

console.log('This one always runs the setter');
// obj2.prop = obj.prop || foo5();

console.log("This one *sometimes* runs the setter");
obj2.prop ||= foo5();
