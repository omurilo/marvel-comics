export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TB_HEROES", {
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
          model: "TB_USERS",
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
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("TB_HEROES");
  },
};
