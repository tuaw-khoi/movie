const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("movieapp", "postgres", "19082005", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  timezone: "+07:00",
});
const dbconn = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = dbconn;
