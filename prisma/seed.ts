import { fakerHU as faker } from '@faker-js/faker';
import { PrismaClient, QuestionState } from '@prisma/client';

faker.seed(42);

const prisma = new PrismaClient();

/**
 * Generate a list of available slots around a reference time
 *
 * @param halfN half number of slots
 * @param refTime median time
 * @param rooms array of room names
 */
function roomSlots({
  halfN,
  refTime = new Date(),
  rooms = ['IB-208', 'IB-205'],
}: {
  halfN: number;
  refTime?: Date;
  rooms?: string[];
}) {
  const result = [];
  const now = new Date(refTime).setMinutes(0, 0, 0);
  const MS_IN_HALF_HOUR = 30 * 60 * 1000;
  for (let halfHours = -halfN; halfHours < halfN; halfHours++) {
    const start = +now + halfHours * MS_IN_HALF_HOUR;
    for (const room of rooms) {
      result.push({ start, end: start + MS_IN_HALF_HOUR, room });
    }
  }
  return result;
}

async function main() {
  const presentationsData = faker.helpers
    .arrayElements(roomSlots({ halfN: 8 }), 15)
    .map(({ start, end, room }) => ({
      title: faker.word.words(5),
      start: new Date(start),
      end: new Date(end),
      presenterFullName: faker.person.fullName(),
      room,
    }));

  await prisma.presentations.createMany({ data: presentationsData });
  const presentations = await prisma.presentations.findMany();

  const askers = faker.helpers
    .multiple(faker.number.int, { count: 12 })
    .map((x) => `user-${x}`);

  await prisma.askers.createMany({ data: askers.map((id) => ({ id })) });

  const questions = [];
  for (const presentation of presentations) {
    if (presentation.start > new Date()) continue;
    const askerIds = faker.helpers.arrayElements(askers, 12);
    for (const askerId of askerIds) {
      if (faker.number.int({ min: 0, max: 2 }) === 0) continue;
      questions.push({
        content: faker.lorem.sentence({ min: 1, max: 30 }),
        askerId: askerId,
        presentationId: presentation.id,
        mark: faker.helpers.maybe(
          () => faker.helpers.arrayElement(['MARKED', 'BLACKLISTED']),
          { probability: 0.3 },
        ) as QuestionState | undefined,
      });
    }
  }
  await prisma.questions.createMany({ data: questions });

  await prisma.askers.updateMany({
    data: {
      blacklistedAt: new Date(),
    },
    where: {
      id: { in: faker.helpers.arrayElements(askers, 3) },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
