// Template Literal Types
function test2(color: 'green' | 'red' | 'yellow'): string {
    return color;
}
test2('black'); // Error
test2('yellow');


type OptionsA1 = {
    [K in 'noImplicitAny' | 'strictNullChecks' | 'strictFunctionTypes']?: boolean
}
// same as
type OptionsA2 = {
    'noImplicitAny'?: boolean,
    'strictNullChecks'?: boolean,
    'strictFunctionTypes'?: boolean,
}




type World = 'world';
type Greeting = `hello ${World}`; // Coming in TS 4.1
// same as
type Greeting2 = 'hello World';


let AAA: Greeting;
let BBB: Greeting2;
type Color = 'red' | 'blue';
type Quantity = 'one' | 'blue';

type SeussFish = `${Quantity | Color} fish`; // Coming in TS 4.1
// same as
type SeussFish2 = 'one fish' | 'two fish' | 'red fish' | 'blue fish';

type VerticalAlignment = 'top' | 'middle' | 'bottom';
type HorizontalAlignment = 'left' | 'center' | 'right';

// Takes
// | 'top-left' | 'top-center' | 'top-right'
// | 'middle-left' | 'middle-center' | 'middle-right'
// | 'bottom-left' | 'bottom-center' | 'bottom-right'
declare function setAlignment(value: `${VerticalAlignment}-${HorizontalAlignment}`): void;

setAlignment('top-left'); // It works!
setAlignment('top-middle'); // Error!
setAlignment('top-pot'); // Error!



let PERSON = makeWatchedObject({
    firstName: 'Homer',
    age: 42,
    location: 'Springfield',
});

PERSON.on('firstNameChanged', () => {
    console.log(`firstName was changed!`);
});

type PropsEventSource2<T> = {
    on(eventName: `${string & keyof T}Changed`, callback: () => void): void;
}

declare function makeWatchedObject<T>(obj: T): T & PropsEventSource2<T>;

// error!
PERSON.on('firstName', () => {});
// error!
PERSON.on('frstNameChanged', () => {});



type PropsEventsource<T> = {
    on<K extends string & keyof T>
    (eventName: `${K}Changed`, callback: (newValue: T[K]) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropsEventsource<T>;

let person = makeWatchedObject({
    firstName: 'Homer',
    age: 42,
    location: 'Springfield',
});

// works! 'newName' is typed as 'string'
person.on("firstNameChanged", newName => {
  // 'newName' has the type of 'firstName'
  console.log(`new name is ${newName.toUpperCase()}`);
});

// works! 'newAge' is typed as 'number'
person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.log("warning! negative age");
  }
})

// Error!
person.on('frstNameChanged', () => {});



type EnthusiasticGreeting<T extends string> = `${Uppercase<T>}`;

type HELLO = EnthusiasticGreeting<'hello'>;
// same as
type HELLO2 = 'HELLO';
// Currently, these utilities are type operators named uppercase, lowercase, capitalize, and uncapitalize.
let AA: HELLO
let BB: HELLO2
