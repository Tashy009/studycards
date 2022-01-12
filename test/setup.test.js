process.env.NODE_ENV = "test";

const User = require("../models/user");
const Collection = require("../models/collections");
const Flashcard = require("../models/flashcard");

//clean up the database before and after each test
beforeEach((done) => {
  Collection.deleteMany({}, function (err) {});
  Flashcard.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});

afterEach((done) => {
  User.deleteMany({}, function (err) {});
  Collection.deleteMany({}, function (err) {});
  Flashcard.deleteMany({}, function (err) {});
  done();
});
