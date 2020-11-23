// Key Remapping in Mapped Types

type Options = {
  [K in "noImplicitAny" | "strictNullChecks" | "strictFunctionTypes"]?: boolean
};
// same as
type Options2 = {
    noImplicitAny?: boolean,
    strictNullChecks?: boolean,
    strictFunctionTypes?: boolean
};


// 'Partial<T>' is the same as 'T', but with each property marked optional.
type Partial2<T> = {
  [K in keyof T]?: T[K]
};

type test2 = {
  numberProp: number,
  stringProp: string,
}

const m: Partial2<test2> = {};



type NewKeyType = string;

type MappedTypeWithNewKeys<T> = {
  [K in keyof T as NewKeyType]: T[K]
  //            ^^^^^^^^^^^^^
  //            This is the new syntax!
}




type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

const student: Person = {
  name: 'Kyle',
  age: 22,
  location: 'Kharkov',
};

const getStudent: LazyPerson = {
  getAge: () => student['age'],
  getName: () => student['name'],
  getLocation: () => student['location'],
};



type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K]
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindLessCircle = RemoveKindField<Circle>;
// same as
type KindLessCircle2 = {
  radius: number;
};

const test: KindLessCircle = {
  radius: 22,
};


