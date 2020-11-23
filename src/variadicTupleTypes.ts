// function concat(arr1, arr2) {
//   return [...arr1, arr2];
// }

// TS 3.9
// ============== 1 ==============
declare function concat1(arr1: [], arr2: []): [];
declare function concat1<A>(arr1: [A], arr2: []): [A];
declare function concat1<A, B>(arr1: [A, B], arr2: []): [A, B];
declare function concat1<A, B, C>(arr1: [A, B, C], arr2: []): [A, B, C];
declare function concat1<A, B, C, D>(arr1: [A, B, C, D], arr2: []): [A, B, C, D];
declare function concat1<A, B, C, D, E>(arr1: [A, B, C, D, E], arr2: []): [A, B, C, D, E];
declare function concat1<A, B, C, D, E, F>(arr1: [A, B, C, D, E, F], arr2: []): [A, B, C, D, E, F];

declare function concat1<A2>(arr1: [], arr2: [A2]): [A2];
declare function concat1<A1, A2>(arr1: [A1], arr2: [A2]): [A1, A2];
declare function concat1<A1, B1, A2>(arr1: [A1, B1], arr2: [A2]): [A1, B1, A2];
declare function concat1<A1, B1, C1, A2>(arr1: [A1, B1, C1], arr2: [A2]): [A1, B1, C1, A2];
declare function concat1<A1, B1, C1, D1, A2>(arr1: [A1, B1, C1, D1], arr2: [A2]): [A1, B1, C1, D1, A2];
declare function concat1<A1, B1, C1, D1, E1, A2>(arr1: [A1, B1, C1, D1, E1], arr2: [A2]): [A1, B1, C1, D1, E1, A2];
declare function concat1<A1, B1, C1, D1, E1, F1, A2>(arr1: [A1, B1, C1, D1, E1, F1], arr2: [A2]): [A1, B1, C1, D1, E1, F1, A2];

// It works! Infers type: [number, number, number, number, number, number, string]
const t41 = concat1([1, 2, 3, 4, 5, 6], ['hello']);
// It works independently on array length
// Error! Infers type: [number, number, number, number, number, number, string, string
const t51 = concat1([1, 2, 3, 4, 5, 6], ['hello', 'world']);



//============== 2 ==============
declare function concat2<T, U>(arr1: T[], arr2: U[]): Array<T | U>;

// It works! But it infers type: (string | number)[]
const t42 = concat2([1, 2, 3, 4, 5, 6], ['hello']);
const t52 = concat2([1, 2, 3, 4, 5, 6], ['hello', 'world']);



// TS 4.0
//============== 3 ==============
function concat<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]): [...T, ...U] {
  return [...t, ...u];
}

const ns = [0, 1, 2, 3];  // number[]

// It works! Infers type: [number, number, string]
const t1 = concat([1, 2], ['hello']);
// It works! Infers type: [boolean, number, number, string]
const t2 = concat([true], t1);
// It works! Infers type: [boolean, boolean, ...number[]]
const t3 = concat([true, false], ns);
// It works! Infers type: [number, number, number, number, number, number, string]
const t4 = concat([1, 2, 3, 4, 5, 6], ['hello']);
// It works independently on array length
// Infers types: [number, number, number, number, number, number, string, string
const t5 = concat([1, 2, 3, 4, 5, 6], ['hello', 'world']);



//============== 4 ==============
type Strings = [string, string];
type Numbers = [number, number];

// TS 4.0 [string, string, number, number, boolean]
type StrStrNumBool1 = [...Strings, ...Numbers, boolean];

type StrStrNumBool2 = [...Strings, ...Numbers, boolean];
// //                    ~~~~~~~~~~
// TS 3.9 Error! A rest element must be last in a tuple type.



//============== 5 ==============
// Inferring to a composite tuple type
function curry<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, ...a: T) {
  return (...b: U) => f(...a, ...b);
}

const fn = (a: number, b: string, c: boolean, d: string[]) => 0;

const c0 = curry(fn);  // (a: number, b: string, c: boolean, d: string[]) => number
const c1 = curry(fn, 1);  // (b: string, c: boolean, d: string[]) => number
const c2 = curry(fn, 1, 'abc');  // (c: boolean, d: string[]) => number
const c3 = curry(fn, 1, 'abc', true);  // (d: string[]) => number
const c4 = curry(fn, 1, 'abc', true, ['x', 'y']);  // () => number

// This doesn't work because we're feeding in the wrong type for 'a'.
const c5 = curry(fn, 'string');
// Error! Argument of type 'string' is not assignable to parameter of type 'number'.

// This doesn't work because we're passing in too many arguments.
const c6 = curry(fn, 100, 'hello', true, ["oops"], 'world')
// Error! Expected 5 arguments, but got 6.

// What can we do with f3 now?
c2(true, ['world']); // works!

c2();
// Error! Expected 2 arguments, but got 0.

c2( 'hello', ["world"]);
// Error! Argument of type 'string' is not assignable to parameter of type 'boolean'.



//============== 6 ==============
// Variadic tuple elements
type Foo<T extends unknown[]> = [string, ...T, number];

type T1 = Foo<[boolean]>;
type T2 = Foo<[number, number]>;
type T3 = Foo<[]>;

// It works! Infers types: [string, boolean, number]
const test1: T1 = ['s', true, 5];
// It works! Infers types: [string, number, number, number]
const test2: T2 = ['s', 1, 2, 3];
// It works! Infers types: [string, number]
const test3: T3 = ['s', 5];



//============== 7 ==============
type Arr = readonly unknown[];

function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R, ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs)
}

const foo1 = (x: string, y: number, z: boolean) => {}

// This doesn't work because we're feeding in the wrong type for 'x'.
const f1 = partialCall(foo1, 100);
//                          ~~~
// error! Argument of type 'number' is not assignable to parameter of type 'string'.


// This doesn't work because we're passing in too many arguments.
const f2 = partialCall(foo1, "hello", 100, true, "oops")
//                                              ~~~~~~
// error! Expected 4 arguments, but got 5.


// This works! It has the type '(y: number, z: boolean) => void'
const f3 = partialCall(foo1, "hello");

// What can we do with f3 now?

f3(123, true); // works!

f3();
// error! Expected 2 arguments, but got 0.

f3(123, "hello");
//      ~~~~~~~
// error! Argument of type 'string' is not assignable to parameter of type 'boolean'.

f3(111, true);
f3(23, false);
const f4 = partialCall(foo, 'srt', 100);

f4(true);
