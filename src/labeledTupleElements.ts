//============== 1 ==============
interface IQuery<TReturn, UParams extends any[] = []> {
  (...args: UParams): Promise<TReturn>
}

type Album = {
  title: string
}

type UnlabeledParams = [string, string];
type Params = [title: string, artist: string];

const findSongAlbum: IQuery<Album, Params> = (title: string, artist: string) => {
  // fetching data...

  const albumName = '1989';
  return Promise.resolve({
    title: albumName
  });
}

const album = findSongAlbum('something', 'something');



// //============== 2 ==============
type MyUnlabeledRange = [number, number];
type MyRange = [start: number, end: number];

function foo(...args: MyRange): void {}
foo(17, 20);



//============== 3 ==============
type Bar = [first: string, number];
                        // ~~~~~~
// error! Tuple members must all have names or all not have names.



//============== 4 ==============
function foo(x: [first: string, second: number]) {
  // ...

  // note: we didn't need to name these 'first' and 'second'
  let [a, b] = x;

  // ...
}



//============== 5 ==============
type Name =
  | [first: string, last: string]
  | [first: string, middle: string, last: string]

function createPerson(...name: Name) {}

createPerson('firstName', 'true', 'lastName'); // works
createPerson('firstName', 123, 'lastName'); // error


type ElementType<T> =
  T extends ReadonlyArray<infer U> ? ElementType<U> : T;

function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
  throw "not implemented";
}

// All of these return the type 'number[]':
deepFlatten([1, 2, 3]);
deepFlatten([[1], [2, 3]]);
deepFlatten([[1], [[2]], [[[3]]]]);
