const hooks = require('hooks');

const tokenPattern = /([0-9]|[a-f]){24,}/g;

hooks.after('Resource > Update Resource', (transaction, done) => {
  let body;

  body = transaction.test.actual.body;
  transaction.test.actual.body = body.replace(tokenPattern, '--- CENSORED ---');

  body = transaction.test.expected.body;
  transaction.test.expected.body = body.replace(tokenPattern, '--- CENSORED ---');

  // Sanitation of diff in the patch format
  // This is some dark magic, as "gavelResult.fields[name].errors" is a Error[].
  // It must never contain "rawData" property. Somehow, this works.
  delete transaction.test.results.body.errors.rawData;
  done();
});
