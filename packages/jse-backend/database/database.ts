import knex from 'knex';
import knexfile from './knexfile';

function database(path: string) {
  const db = knex(knexfile(path).development);
  return db;
}
export default database;