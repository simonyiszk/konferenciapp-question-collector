import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pres1 = await prisma.presentation.create({
    data: {
      title: 'Example presentation 1',
      speaker_fullname: 'Alice Bob',
      room: 'room 1',
      start_time: new Date('2021-10-10T10:00:00'),
      end_time: new Date('2021-10-10T11:00:00'),
    },
  });
  console.log(pres1.title, pres1);
  const pres2 = await prisma.presentation.create({
    data: {
      title: 'Example presentation 2',
      speaker_fullname: 'Charlie Dole',
      room: 'room 2',
      start_time: new Date('2021-10-10T10:00:00'),
      end_time: new Date('2021-10-10T12:00:00'),
    },
  });
  console.log(pres2.title, pres2);

    const marked = new Set([1, 5, 6]);
    const

  for (let i = 0; i < 10; i++) {
    await prisma.question.create({
      data: {
        content: `Question ${i}`,
        presentationId: i % 2 === 0 ? pres1.id : pres2.id,
        userId: (i % 4).toString(),
      },
    });
  }

  [1, 5, 6];
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
