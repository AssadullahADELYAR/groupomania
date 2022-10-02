const moment = require("moment");
module.exports = (sequelize, Sequelize) => {
   const Posts = sequelize.define(
      "posts",
      {
         post_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
         },
         text: { type: Sequelize.STRING(1000), allowNull: true },
         image_url: { type: Sequelize.STRING, allowNull: true },
         date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            get: function () {
               // return moment(this.getDataValue("date")).format("DD/MM/YYYY");
               return moment(this.dataValues.date).format("DD MMMM YYYY ");
            },
         },
      },
      {
         timestamps: false,
      }
   );
   return Posts;
};
