import Sequelize from "sequelize";

const UserSchema = {
  name: "Users",
  schema: {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "TB_USERS",
  },
};

export default UserSchema;
