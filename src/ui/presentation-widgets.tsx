import { Presentation } from '@prisma/client';
import clsx from 'clsx';

import { isPresentationCurrent } from '@/lib/presentation.utils';
import { PageRoot } from '@/types/route';
import { PresentationItem } from '@/ui/presentation-item';

export function PresentationWidgets({
  presentations,
  pageRoot,
}: {
  presentations: Presentation[];
  pageRoot: PageRoot;
}) {
  const currentPresentations = presentations.filter(isPresentationCurrent);
  const upcomingPresentations = presentations
    .filter((p) => new Date() < p.start && !currentPresentations.includes(p))
    .slice(0, 4);

  const toWidget = (presentation: Presentation) => (
    <PresentationItem
      presentation={presentation}
      key={presentation.id}
      href={`${PageRoot.asHref(pageRoot)}/presentation/${presentation.id}`}
    />
  );

  return (
    <>
      <div
        className={clsx({
          hidden: currentPresentations.length === 0,
        })}
      >
        <h2>Aktuális előadások</h2>
        <ul>{currentPresentations.map(toWidget)}</ul>
      </div>
      <h2>Következő előadások</h2>
      <div>
        <ul>{upcomingPresentations.map(toWidget)}</ul>
      </div>
    </>
  );
}
