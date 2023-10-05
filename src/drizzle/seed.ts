import { NewUser, users } from "./schema";
import { faker } from "@faker-js/faker";
import { db } from "./migrate";
import { getHash } from "@/utils/encryption";

const genPassCodeHash = async (params: string[]) =>
  Promise.all(params.map((p) => getHash(p)));

async function seed() {
  const passcodes = ["use1", "use2", "use3", "use4"];

  const hashes = await genPassCodeHash(passcodes);

  const usersData: NewUser[] = [
    {
      id: 2000,
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: "user",
      password: hashes[0],
    },
    {
      id: 2001,
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: "user",
      password: hashes[1],
    },

    {
      id: 2002,
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: "user",
      password: hashes[2],
    },
    {
      id: 2003,
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: "user",
      password: hashes[3],
    },
  ];

  const deleted = await db.delete(users).returning();

  console.log(`deleted ${deleted.length} categories!`);

  const storedUsers = await db.insert(users).values(usersData).returning();

  console.log(`Inserted ${storedUsers.length} categories!`);

  process.exit(0);
}

seed();
