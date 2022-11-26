// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5423,
      database: "postgres",
      user: "postgres",
      password: "3muhammad3",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
