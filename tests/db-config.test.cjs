const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../app/db.js'), 'utf8');
async function run() {
  const noEnv = {require: () => ({connect() {throw Error('must not connect');}}), process: {env: {}}, console};
  assert.throws(() => vm.runInNewContext(source, noEnv), /Set MONGODB_URI/);
  let uri;
  const output = [];
  const context = {require: () => ({connect(value) {uri = value; return Promise.reject(Error('private detail'));}}),
    process: {env: {MONGODB_URI: 'mongodb://localhost/synthetic'}}, console: {log() {}, error: value => output.push(value)}};
  vm.runInNewContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(uri, 'mongodb://localhost/synthetic');
  assert.equal(context.process.exitCode, 1);
  assert.deepEqual(output, ['MongoDB connection failed. Check server configuration.']);
  console.log('PASS: required configuration, configured URI and redacted failure');
}
run().catch(error => {console.error(error);process.exitCode = 1;});
