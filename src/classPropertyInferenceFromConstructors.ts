class Square {
  // Error! Property 'sideLength' has no initializer
  // and is not definitely assigned in the constructor.
  sideLength: number;

  constructor(sideLength: number) {
    this.initialize(sideLength);
  };

  initialize(sideLength: number) {
    this.sideLength = sideLength;
  };

  get area() {
    return this.sideLength ** 2;
  };
}

class Square2 {
  // Now: inferred to `number`!
  area; // Type: number
  sideLength; // Type: number

  constructor(sideLength: number) {
    this.sideLength = sideLength;
    this.area = sideLength ** 2;
  };
}


// In cases where not all paths of a constructor assign to an instance member, the property is considered to potentially be undefined.
class Square3 {
  sideLength;

  constructor(sideLength: number) {
    if(Math.random()) {
      this.sideLength = sideLength;
    }
  };

  get area() {
    return this.sideLength ** 2;
    //     ~~~~~~~~~~~~~~~
    // error! Object is possibly 'undefined'.
  }
}


class Square4 {
  // definite assignment assertion
  //
  sideLength: number;
  //         ^^^^^^^^
  // type annotation

  constructor(sideLength: number) {
    this.initialize(sideLength);
  };

  initialize(sideLength: number) {
    this.sideLength = sideLength;
  };

  get area() {
    return this.sideLength ** 2;
  };
}

class Square5 {
  // It Works
  // Using definite assignment assertion
  sideLength!: number;

  constructor(sideLength: number) {
    this.initialize(sideLength);
  };

  initialize(sideLength: number) {
    this.sideLength = sideLength;
  };

  get area() {
    return this.sideLength ** 2;
  };
}
