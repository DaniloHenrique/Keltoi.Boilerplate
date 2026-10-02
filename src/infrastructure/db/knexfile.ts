import type { Knex } from "knex";


const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "C:\\Users\\kelto\\source\\repos\\Keltoi.BFF\\db\\config.sqlite"
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  },  
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  } 
};

export default config;
