import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const bannedUsers = [
    {
      name: 'user-11111',
      createdAt: new Date('2021-01-01 13:25:11'),
      bannedAt: new Date('2021-01-01 13:25:30'),
      questions: [
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:11'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
      ],
    },
    {
      name: 'user-22222',
      createdAt: new Date('2021-01-01 13:25:11'),
      bannedAt: new Date('2021-01-01 13:25:30'),
      questions: [
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:11'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
        {
          presentation: 'FooBar microservice a gyakorlatban',
          content: 'Mi a legjobb megoldás a problémára?',
          createdAt: new Date('2021-01-01 13:25:12'),
        },
      ],
    },
  ];
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Kitiltott felhasználók
      </h1>
      {/* Username as headline, then in time of creation and ban. After that display cards in Cards */}
      {bannedUsers.map((user, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold">👤 {user.name}</h2>
          <div>
            <p className="text-sm text-gray-500">
              Létrehozva: {user.createdAt.toLocaleString('hu-HU')}
            </p>
            <p className="text-sm text-gray-500">Kitiltva ekkor: 32 sec</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {user.questions.map((question, index) => (
              <Card
                key={index}
                title={question.presentation}
                value={question.content}
                type="pending"
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
