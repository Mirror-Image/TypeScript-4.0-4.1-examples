// --noUncheckedIndexedAccess flag

interface Options3 {
  path: string;
  permissions: number;

  // Extra properties are caught by this index signature.
  [propName: string]: string | number;
}

function checkOptions(opts: Options3) {
  opts.path // string
  opts.permissions // number

  // These are all allowed too!
  // They have the type 'string | number'.
  opts.yadda.toString();
  opts['foo bar baz'].toString();
  opts[Math.random()].toString();


  // Checking if it's really there first.
  if (opts.yadda) {
    console.log(opts.yadda.toString());
  }

  // Basically saying "trust me I know what I'm doing"
  // with the '!' non-null assertion operator.
  opts.yadda!.toString();
}



function screamKines(strs: string[]) {
  // this will have issues
  for (let i = 0; i < strs.length; i++) {
    console.log(strs[i].toUpperCase());
    //          ~~~~~~~
    // error! Object is possibly 'undefined'.
  }
}

// If you don’t need the indexes, you can iterate over individual elements by using a for–of loop or a forEach call.
function screamLines2(strs: string[]) {
  // this works fine
  for (const str of strs) {
    console.log(str.toUpperCase());
  }

  // this works fine
  strs.forEach(str => {
    console.log(str.toUpperCase());
  });
}
