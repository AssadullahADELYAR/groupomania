module.exports = (sequelize, Sequelize) => {
   const Users = sequelize.define(
      "users",
      {
         user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
         },
         first_name: { type: Sequelize.STRING, allowNull: false },
         last_name: { type: Sequelize.STRING, allowNull: false },
         email: { type: Sequelize.STRING, allowNull: false, unique: true },
         password: { type: Sequelize.STRING, allowNull: false },
         image_url: { type: Sequelize.STRING, allowNull: true },
         date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
         },
      },
      {
         timestamps: false,
      }
   );
   return Users;
};
