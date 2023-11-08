const knex = require("knex");
const config = require("../../utils/knexfile");
const db = require("./dbconnection");

const establishConnection = async (dbConfig) => {
  try {
    const connection = await knex(dbConfig);
    await connection.raw('SELECT 1');
    console.log('Database connection established successfully!');
    return connection;
  } catch (error) {
    console.error('Failed to establish database connection:', error);
    throw error;
  }
};

const dbCheck = async (req, res, next) => {
  
  if (req.originalUrl.includes('/api/aibot/v1/dev')) {
    const connection = await establishConnection(config.AIBOTDev);
    await db.setDbConnection(connection);
    console.log('MySQL efs admin  dev connected');
  } else if (req.originalUrl.includes('/aibot/v1/dev')) {
    const connection = await establishConnection(config.AIBOTDev);
    await db.setDbConnection(connection);
    console.log('MySQL efs admin connected');
  } 

  next();
};

module.exports = { dbCheck };











 



























