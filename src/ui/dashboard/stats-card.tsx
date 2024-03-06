import { lusitana } from '@/ui/fonts';

// const iconMap = {
//   marked: StarIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   invoices: InboxIcon,
// };

export function StatsCard({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: any;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {children}
      </p>
    </div>
  );
}