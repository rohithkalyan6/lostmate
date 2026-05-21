import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { CaseLink, PageShell } from '../components/ui';

const actions = [
  ['01', 'Report Lost', 'Open a case with the last known location.', '/report-lost'],
  ['02', 'Report Found', 'Record a recovered item for review.', '/report-found'],
  ['03', 'View Items', 'Browse live lost and found entries.', '/lost'],
];

const Dashboard = () => {
  return (
    <AnimatedPage>
      <PageShell
        eyebrow="Student Desk"
        title="Three moves. One return."
        description="Report what went missing, log what you found, or scan the board for a match. The interface stays quiet so the item details stand out."
        className="min-h-[80vh]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map(([number, label, copy, to]) => (
            <article key={label} className="page-panel flex min-h-72 flex-col p-6">
              <p className="font-serif text-6xl font-bold leading-none text-[var(--signal)]">{number}</p>
              <h2 className="mt-8 text-3xl font-bold">{label}</h2>
              <p className="body-copy mt-3 flex-1">{copy}</p>
              <CaseLink to={to} className="mt-6 w-full">
                {label}
              </CaseLink>
            </article>
          ))}
        </div>
      </PageShell>
    </AnimatedPage>
  );
};

export default Dashboard;
