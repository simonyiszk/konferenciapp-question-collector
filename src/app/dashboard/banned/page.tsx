import { prisma } from '@/server-lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const blacklist = await prisma.user.findMany({
    where: { blacklistedAt: { not: null } },
    orderBy: { createdAt: 'desc' },
    include: { questions: { include: { presentation: true } } },
  });
  return (
    <main className="p-10">
      <h1>Kitiltott felhasználók</h1>
      {/* Username as headline, then in time of creation and ban. After that display cards in Cards */}
      {blacklist.map((asker) => (
        <div key={asker.id} className="mb-5 space-y-2">
          <h2 className="text-xl font-semibold">{asker.id}</h2>
          <div>
            <p className="text-sm text-gray-500">
              Létrehozva: {asker.createdAt.toLocaleString('hu-HU')}
            </p>
            <p className="text-sm text-gray-500">
              Kitiltva ekkor: {asker.createdAt.toISOString().slice(11, 19)}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {asker.questions.map((question, index) => (
              <div
                className="rounded-md bg-white p-4 shadow-md"
                key={index}
                title={question.presentation.title}
              >
                {question.content}{' '}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
