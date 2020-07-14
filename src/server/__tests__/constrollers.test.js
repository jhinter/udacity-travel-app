const supertest = require("supertest");
const app = require("../app.js");
const { Mock } = require("../../shared/mock.js");

const apiServer = supertest(app);

describe("Express API controllers", () => {
  test("POST: Adding a new trip", async (done) => {
    const res = await apiServer.post(`/trips`).send(Mock.getTripPost());
    expect(res.statusCode).toEqual(200);
    // checking if res.body contains values for date, destination, and weather
    expect(res.body.date).toBeTruthy();
    expect(res.body.destination).toBeTruthy();
    expect(res.body.weather).toBeTruthy();
    done();
  });

  test("GET: Getting all trips", async (done) => {
    const res = await apiServer.get(`/trips`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    done();
  });

  test("DELETE: Deleting a trip", async (done) => {
    const resPost = await apiServer.post(`/trips`).send(Mock.getTripPost());
    const id = resPost.body.id;

    const resDelete = await apiServer.delete(`/trips/${id}`);
    expect(resDelete.statusCode).toEqual(200);

    const res = await apiServer.get(`/trips`);
    expect(res.body.length).toEqual(1);

    const resInvalid = await apiServer.delete(`/trips/invalid-id`);
    expect(resInvalid.statusCode).toEqual(404);
    done();
  });
});