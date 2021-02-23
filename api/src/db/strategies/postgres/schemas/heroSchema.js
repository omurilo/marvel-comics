import Sequelize from "sequelize";

const UserSchema = {
  name: "Heroes",
  schema: {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    marvel_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_favorite: {
      type: Sequelize.BOOLEAN,
      field: "is_favorite",
      allowNull: false,
    },
  },
  options: {
    tableName: "TB_HEROES",
  },
};

export default UserSchema;
