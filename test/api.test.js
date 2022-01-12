const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");
chai.use(chaiHttp);

describe("User workflow tests", () => {
  it("should register + login a user, create collection and verify 1 in DB", (done) => {
    // 1) Register new user
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/api/v1/auth/register")
      .send({
        name: "Peter",
        email: "mail@petersen.com",
        password: "123456",
      })
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a("object");
        //expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        chai
          .request(server)
          .post("/api/v1/auth/login")
          .send({
            email: "mail@petersen.com",
            password: "123456",
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            //expect(res.body.error).to.be.equal(null);
            let token = res.body.token;

            // 3) Create new product
            let collection = {
              name: "Test collection",
            };

            chai
              .request(server)
              .post("/api/v1/collection")
              .auth(token, { type: "bearer" })
              .send(collection)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("object");
                //expect(res.body.length).to.be.eql(1);

                let savedCollection = res.body.collection;
                expect(savedCollection.name).to.be.equal(collection.name);

                // 4) Verify one product in test DB
                chai
                  .request(server)
                  .get("/api/v1/collection")
                  .auth(token, { type: "bearer" })
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("object");
                    expect(res.body.count).to.be.eql(1);

                    done();
                  });
              });
          });
      });
  });

  it("should register + login a user, create collection and verify 1 in DB", (done) => {
    // 1) Register new user
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/api/v1/auth/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a("object");
        //expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        chai
          .request(server)
          .post("/api/v1/auth/login")
          .send({
            email: "mail@petersen.com",
            password: "123456",
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            //expect(res.body.error).to.be.equal(null);
            let token = res.body.token;

            // 3) Create new product
            let collection = {
              name: "Test collection",
            };

            chai
              .request(server)
              .post("/api/v1/collection")
              .auth(token, { type: "bearer" })
              .send(collection)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("object");
                //expect(res.body.length).to.be.eql(1);

                let savedCollection = res.body.collection;
                expect(savedCollection.name).to.be.equal(collection.name);

                // 4) Delete product
                chai
                  .request(server)
                  .delete("/api/v1/collection/" + savedCollection._id)
                  .auth(token, { type: "bearer" })
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    done();
                  });
              });
          });
      });
  });

  it("should register user with invalid input", (done) => {
    // 1) Register new user with invalid inputs
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123", //Faulty password - Joi/validation should catch this...
    };
    chai
      .request(server)
      .post("/api/v1/auth/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a("object");
        expect(res.body.msg).to.be.equal(
          "Path `password` (`123`) is shorter than the minimum allowed length (6)."
        );
        done();
      });
  });
});
