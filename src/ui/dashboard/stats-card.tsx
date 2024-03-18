export function StatsCard({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children?: React.ReactNode;
  icon: any;
}) {
  return (
    <div className="flex flex-col rounded-xl bg-slate-50 p-2 shadow-md shadow-slate-500/10">
      <div className="flex-0 flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <div className="ml-2 text-sm font-medium">{title}</div>
      </div>
      <div className="flex-1 truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {children}
      </div>
    </div>
  );
}
