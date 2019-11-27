// process.env.TZ = 'UTC'
require('dotenv').config()
process.env.NODE_ENV = 'test';
const { expect } = require('chai')
const supertest = require('supertest') //these 2 tests will run before any other test 

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || "postgresql://dunder_mifflin@localhost/emma-test";


global.expect = expect
global.supertest = supertest
// seting up on global , hence dont need to  pull in super test in the test file.
