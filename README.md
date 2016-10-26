# trace-step

A tool used in mocha, it log and verify your code steps to make sure code flow was as same as what you expect.


## Sample 1, exectly match.
```
let TraceStep = require('trace-step');

describe('test one', () => {
  it('sample case', (done) => {
    let ts = new TraceStep();

    //test your code
    ts.step('done with foo');

    // test your code
    ts.step('done with bar');

    //....
    ts.step('lastest step');

    ts.match('done with foo', 'done with bar', 'lastest step'); // AssertError will be thrown if these steps not be followed.
  });
});
```


## Sample 2, resemble match.

```
describe('test one', () => {
  it('sample case, resemble', (done) => {
    let ts = new TraceStep();

    //test your code
    ts.step(1);

    // test your code
    ts.step(2);

    //....
    ts.step(3);

    ts.resemble(2, 1, 3);
  });
});
```

## Sample 3, work with async.
```

  it('async sample', (done) => {
    let ts = new TraceStep();

    let done = ts.wrap(done);

    asyncCall().then(() => {
      //do something.
      ts.step(1);
    }).then(() => {
      //do something.
      ts.step(2);
    }).then(() => {
      //do something
      ts.match(1, 2);
    }).then(done,done);
  });
});

```
