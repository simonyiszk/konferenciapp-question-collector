import { prisma } from '@/server-lib/prisma';
import { lusitana } from '@/ui/fonts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const blacklist = await prisma.user.findMany({
    where: { blacklistedAt: { not: null } },
    orderBy: { createdAt: 'desc' },
    include: { questions: { include: { presentation: true } } },
  });
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Kitiltott felhasználók
      </h1>
      {/* Username as headline, then in time of creation and ban. After that display cards in Cards */}
      {blacklist.map((asker) => (
        <div key={asker.id} className="mb-8">
          <h2 className="text-xl font-semibold">👤 {asker.id}</h2>
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
                className="border p-2"
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
