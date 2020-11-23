// Since the beginning days of TypeScript, catch clause variables have always been typed as any. This meant that TypeScript allowed you to do anything you wanted with them.
try {

} catch (x) {
  // x has type 'any' - have fun!
  console.log(x.message);
  console.log(x.toUpperCase());
  x++;
  x.yadda.yadda.yadda();
}



/*
The above has some undesirable behavior if we’re trying to prevent more errors from happening in our error-handling code! Because these variables have the type any by default, they lack any type-safety which could have errored on invalid operations.

That’s why TypeScript 4.0 now lets you specify the type of catch clause variables as unknown instead. unknown is safer than any because it reminds us that we need to perform some sorts of type-checks before operating on our values.
*/
try {

} catch (e: unknown) {
  // error!
  // Property 'toUpperCase' does not exist on type 'unknown'.
  console.log(e.toUpperCase());

  if (typeof e === 'string') {
    // works!
    // We've narrowed 'e' down to the type 'string'.
    console.log(e.toUpperCase());
  }
}

try {
  // ...
}catch(error: unknown) {
  if(typeof error === "string") {
    error.toUpperCase()
  }

  if(typeof error === "number") {
    error.toFixed()
  }
  // Error! Object is of type 'unknown'.
  error++;
}
