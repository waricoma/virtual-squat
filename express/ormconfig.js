module.exports = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "development",
  synchronize: false,
  entities: ["./server/api/entities/*.ts"],
  migrations: ["./server/api/db/migrations/*.ts"],
  subscribers: ["./server/api/db/subscribers/*.ts"],
  cli: {
    entitiesDir: "./server/api/entities/",
    migrationsDir: "./server/api/db/migrations/",
    subscribersDir: "./server/api/db/subscribers/",
  },
};
