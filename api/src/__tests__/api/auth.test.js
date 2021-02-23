import api from "../..";
import Context from "../../db/strategies/base/context/strategy";
import PostgreSQL from "../../db/strategies/postgres";
import UserSchema from "../../db/strategies/postgres/schemas/userSchema";

let app = {};

const USER = {
  username: "therock",
  password: "therock@123",
};

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: "$2b$10$NrxlajCnxbATNvw4UTosBeBbSJAdP.ihbNPtgOL4e6/vLcWJBScyK",
};

describe("Auth test suite", () => {
  beforeAll(async () => {
    app = await api;
    const connection = await PostgreSQL.connect();
    const model = await PostgreSQL.defineModel(connection, UserSchema);
    const context = new Context(new PostgreSQL(connection, model));

    await context.update(null, USER_DB, true);
  });

  it("should be get token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/auth",
      payload: USER,
    });

    const { statusCode } = result;
    const data = JSON.parse(result.payload);

    expect(statusCode).toEqual(200);
    expect(data.token.length).toBeGreaterThanOrEqual(10);
  });

  it("shouldn't get token by user not found", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/auth",
      payload: {
        username: "thestone",
        password: "123",
      },
    });

    const { statusCode } = result;
    const data = JSON.parse(result.payload);

    expect(statusCode).toEqual(401);
    expect(data.message).toEqual("User not found");
  });

  it("shouldn't get token by user or password is invalid", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/auth",
      payload: {
        ...USER,
        password: "1221",
      },
    });

    const { statusCode } = result;
    const data = JSON.parse(result.payload);

    expect(statusCode).toEqual(401);
    expect(data.message).toEqual("User or password is invalid");
  });

  it("shouldn't get token by validation failed", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/auth",
      payload: {
        password: "1221",
      },
    });

    const { statusCode } = result;
    const data = JSON.parse(result.payload);

    expect(statusCode).toEqual(400);
    expect(data.message).toEqual('"username" is required');
  });
});
