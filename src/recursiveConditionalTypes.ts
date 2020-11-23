// Flattening arrays
type ElementType<T> =
  T extends ReadonlyArray<infer U> ? ElementType<U> : T;

function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
  throw 'not implemented';
}

// All of these return the type 'number[]':
const g = deepFlatten([1, 2, 3]);
const j = deepFlatten([[1], [2], [3]]);
const f = deepFlatten([[[1], [2], [3]]]);
const k = deepFlatten([[[1], [2], [3, [{type: 'test'}]]]]);



type Flatten<T extends readonly unknown[]> = T extends unknown[]? _Flatten<T>[]: readonly _Flatten<T>[];
type _Flatten<T> = T extends readonly (infer U)[] ? _Flatten<U> : T;

type InfiniteArray<T> = InfiniteArray<T>[];

type A1 = Flatten<string[][][]>; // string[]
type A2 = Flatten<string[][] | readonly (number[] | boolean[][])[]>; // string[] | readonly (number | boolean)[]
type A3 = Flatten<InfiniteArray<string>>;
// type A4 = A3[0]; // Infinite depth error



// Repeating tuples
type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type T1 = TupleOf<string, 3>; // [string, string, string]
type T2 = TupleOf<number, 0 | 2 | 4>; // [] | [number, number] | [number, number, number, number]
type T3 = TupleOf<number, number>; // number[]
// type T4 = TupleOf<number, 100>; // Depth error



interface Box<T> { value: T }
type RecBox<T> = T | Box<RecBox<T>>;

declare function unbox<T>(box: RecBox<T>): T

type T12 = Box<string>;
type T13 = Box<T12>;
type T14 = Box<T13>;
type T15 = Box<T14>;
type T16 = Box<T15>;

declare let b1: Box<Box<Box<Box<Box<Box<string>>>>>>;
declare let b2: T16;

unbox(b1); // string
unbox(b2); // string (previously T6)
unbox({ value: { value: { value: 5 }}}); // number (previously { value: { value: number }})
// Previously, only the unbox(b1) call produced the expected type inference.



// Awaiting promises
type Awaited<T> =
  T extends null | undefined ? T :
  T extends PromiseLike<infer U> ? Awaited<U> :
  T;

type P11 = Awaited<Promise<string>>; // string
type P21 = Awaited<Promise<Promise<string>>>; // string
type P31 = Awaited<Promise<string | Promise<Promise<number> | undefined>>>; // string | number | undefined


const aa: P11 = 'string';
const bb: P21 = 'string';
const cc: P31 = undefined;

/// Like `promise.then(...)`, but more accurate in types.
declare function customThen<T, U>(
  p: Promise<T>,
  onFulfilled: (value: Awaited<T>) => U
): Promise<Awaited<U>>;

type Awaited2<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

type P1 = Awaited2<Promise<string>>; // string
type P2 = Awaited2<Promise<Promise<string>>>; // string
type P3 = Awaited2<Promise<string | Promise<Promise<number> | undefined>>>; // string | number | undefined


const a: P1 = 'string';
const b: P2 = 'string';
const c: P3 = undefined;
