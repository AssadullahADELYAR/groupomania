const dbConfig = require("../config/dbConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
   host: dbConfig.HOST,
   dialect: dbConfig.dialect,
   pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
   },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);
db.posts = require("./posts.js")(sequelize, Sequelize);
db.sequelize.sync({ force: false }).then(() => {
   console.log("Drop and re-sync db.");
});

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

module.exports = db;
