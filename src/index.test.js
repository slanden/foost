import { shouldJsonify } from './util.js';
import config from './config.js';

// All unit tests go in here
const tests = {
  should_tell_if_object_should_be_jsonified() {
    assert(shouldJsonify(new FormData()) == false);
    assert(shouldJsonify(new File([], '')) == false);
    assert(shouldJsonify(new Blob()) == false);
    assert(shouldJsonify(new ArrayBuffer(8)) == false);
    assert(shouldJsonify(new URLSearchParams()) == false);
    assert(shouldJsonify('text') == false);
    assert(shouldJsonify(undefined) == false);
    assert(shouldJsonify({}) == true);
    assert(shouldJsonify([]) == true);
  },
};

const parseMatcher = /\w+@|at (?:.*\.)?(\w+) (.+)/g;
let errors = [];

/** Get the function name, file, and location from an Error */
function parseError(e) {
  // get function calls
  const matches = e.stack.matchAll(parseMatcher);
  // skip the calling function, `assert()`
  matches.next();
  // return calling function's parent, and the file & line number
  const m = matches.next();
  const file = m.value[2].substring(
    `http://localhost:${config.PORT}/src/`.length,
    m.value[2].length - 1
  );

  return { fn: m.value[1], file };
}

/** Test a condition and aggregate errors when it's false */
function assert(predicate, msg = 'Assertion Failed') {
  if (!predicate) {
    const e = new Error(msg);

    errors.push(e);
    return e;
  }
}

function run() {
  console.log(`Running Tests...`);
  let hasFailures = false;
  for (let fn in tests) {
    tests[fn]();
    if (errors.length) {
      hasFailures = true;

      console.log(
        `${fn}:\n${errors
          .map((err) => `  ${err.message}: ${parseError(err).file}`)
          .join('\n')}`
      );

      // reset `errors` for next function
      errors = [];
    }
  }

  if (!hasFailures) {
    console.log(`All tests succeeded.`);
  }
}

run();
