import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh a token", async () => {
    await request(app.server).post("/users").send({
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("No cookies set in response");
    }

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    const setCookie = response.get("Set-Cookie");
    expect(setCookie).toEqual(
      expect.arrayContaining([
        expect.stringContaining("refreshToken="),
      ])
    );
  });
});
