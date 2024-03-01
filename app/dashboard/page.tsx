import { StatsCard } from '@/app/ui/dashboard/stats-cards';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <div>
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          FooBar microservice a gyakorlatban
        </h1>
        <div className="flex space-x-2 text-sm text-white">
          <span className="rounded-full bg-red-500 p-1.5 px-4">IB-208</span>
          <span className="rounded-full bg-green-500 p-1.5 px-4">Live</span>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Előadás vége" value={'5m 6s'} type="pending" />
        <StatsCard title="Beérkezett" value={2} type="invoices" />
        <StatsCard title="Megjelölt" value={1} type="marked" />
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <StatsCard title="user-11111" value={'Mi az hogy mi?'} type="marked" />
        <StatsCard title="user-11111" value={'Mi az hogy mi?'} type="marked" />
        <StatsCard title="user-11111" value={'Mi az hogy mi?'} type="marked" />
        <StatsCard title="user-11111" value={'Mi az hogy mi?'} type="marked" />
        <StatsCard title="user-11111" value={'Mi az hogy mi?'} type="marked" />
      </div>
    </main>
  );
}
