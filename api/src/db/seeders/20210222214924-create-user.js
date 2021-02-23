// eslint-disable-next-line import/no-extraneous-dependencies
import uuid from "uuid";

import { generateHash } from "../../helpers/PasswordHelper";

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("TB_USERS", [
      {
        id: uuid.v4(),
        username: "therock",
        password: await generateHash("therock@123"),
      },
      {
        id: uuid.v4(),
        username: "omurilo",
        password: await generateHash("omurilo@123"),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("TB_USERS", null, {});
  },
};
