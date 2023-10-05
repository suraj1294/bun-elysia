import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

export const db = drizzle(migrationClient);

async function main() {
  await migrate(db, {
    migrationsFolder: "src/drizzle/migrations",
  });
}

main()
  .then((res) => {
    console.log("Tables migrated!");

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error performing migration: ", err);
    process.exit(1);
  });
