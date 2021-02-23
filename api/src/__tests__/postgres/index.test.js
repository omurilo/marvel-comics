import "../../../config/env";
import PostgreSQL from "../../db/strategies/postgres";
import HeroSchema from "../../db/strategies/postgres/schemas/heroSchema";
import Context from "../../db/strategies/base/context/strategy";

const MOCK_HERO_STORE = {
  user_id: "4e37c312-22af-4a08-baf4-1c87d9cb3ccf",
  marvel_id: 1,
  is_favorite: false,
};
const MOCK_HERO_UPDATE = {
  user_id: "4e37c312-22af-4a08-baf4-1c87d9cb3ccf",
  marvel_id: 2,
  is_favorite: true,
};

let postgresContext = {};

describe("Postgres test", () => {
  beforeAll(async () => {
    const connection = await PostgreSQL.connect();
    const model = await PostgreSQL.defineModel(connection, HeroSchema);
    postgresContext = new Context(new PostgreSQL(connection, model));
    await postgresContext.delete({ areUCrazy: true });
    await postgresContext.store(MOCK_HERO_UPDATE);
  });

  jest.setTimeout(999999);
  it("should connect to PostgreSQL", async () => {
    const result = await postgresContext.isConnected();

    expect(result).toBeTruthy();
  });

  it("should be store a hero", async () => {
    const result = await postgresContext.store(MOCK_HERO_STORE);
    delete result.id;
    expect(result).toEqual(MOCK_HERO_STORE);
  });

  it("should be list a heroes", async () => {
    const {
      rows: [results],
    } = await postgresContext.index({
      marvel_id: MOCK_HERO_STORE.marvel_id,
    });
    delete results.id;
    expect(results).toEqual(MOCK_HERO_STORE);
  });

  it("should be search a hero by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      marvel_id: MOCK_HERO_STORE.marvel_id,
    });
    const result = await postgresContext.show(item.id);
    delete result.id;
    expect(result).toEqual(MOCK_HERO_STORE);
  });

  it("should be update a hero by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      marvel_id: MOCK_HERO_UPDATE.marvel_id,
    });
    const newItem = { ...MOCK_HERO_UPDATE, marvel_id: 3 };
    const [, [result]] = await postgresContext.update(item.id, newItem);
    delete result.id;
    expect(result.marvel_id).toEqual(newItem.marvel_id);
  });

  it("should be delete a hero by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      marvel_id: MOCK_HERO_STORE.marvel_id,
    });
    const result = await postgresContext.delete({ id: item.id });
    expect(result).toBeTruthy();
  });
});
