// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from 'dotenv';
dotenv.config();
export default {
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
