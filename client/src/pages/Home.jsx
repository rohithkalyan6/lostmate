import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const HeroIllustration = () => (
  <svg viewBox="0 0 520 460" role="img" aria-labelledby="heroIllustrationTitle" className="h-auto w-full max-w-[520px]">
    <title id="heroIllustrationTitle">Person searching for lost belongings</title>
    <rect x="78" y="356" width="360" height="22" rx="11" fill="#efefef" />
    <path d="M129 124c18-29 57-43 98-34 31 7 53 28 77 43 32 19 78 20 99 50 20 29 11 70-16 93-27 24-73 31-118 27-44-3-85-17-118-42-43-33-50-91-22-137z" fill="#f7f7f7" />
    <g fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
      <path d="M220 152c-18 13-25 35-19 57" />
      <path d="M287 151c21 13 29 39 20 64" />
      <path d="M239 272l-20 83" />
      <path d="M284 271l37 78" />
      <path d="M219 355h-46" />
      <path d="M321 349h48" />
      <path d="M206 206l-56 35" />
      <path d="M311 207l53 37" />
    </g>
    <path d="M216 192c6-42 31-61 70-45 24 10 33 37 23 70l-16 55h-72z" fill="#111" />
    <path d="M243 116c0-21 14-36 34-36s36 15 36 36-16 38-36 38-34-17-34-38z" fill="#111" />
    <path d="M268 95c16 7 35 7 55 1-6-18-22-31-43-31-19 0-35 11-43 27 9-2 20-1 31 3z" fill="#fff" stroke="#111" strokeLinejoin="round" strokeWidth="7" />
    <path d="M203 191c-33 2-57 28-57 63v43c0 20 16 36 36 36h23z" fill="#fff" stroke="#111" strokeLinejoin="round" strokeWidth="7" />
    <path d="M163 238h40" stroke="#111" strokeLinecap="round" strokeWidth="7" />
    <path d="M362 244l32 28 33-42" fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
    <path d="M116 151l26-20 28 18-4 35h-47z" fill="#fff" stroke="#111" strokeLinejoin="round" strokeWidth="6" />
    <path d="M382 111h48v54h-48z" fill="#fff" stroke="#111" strokeLinejoin="round" strokeWidth="6" />
    <path d="M395 128h22M395 145h16" stroke="#111" strokeLinecap="round" strokeWidth="5" />
    <path d="M82 243c15-15 39-15 54 0 15 15 15 39 0 54s-39 15-54 0-15-39 0-54z" fill="#fff" stroke="#111" strokeWidth="6" />
    <path d="M101 261h18v18h-18z" fill="#111" />
    <path d="M435 300c18 0 32 14 32 32s-14 32-32 32-32-14-32-32 14-32 32-32z" fill="#fff" stroke="#111" strokeWidth="6" />
    <path d="M424 332h22M435 321v22" stroke="#111" strokeLinecap="round" strokeWidth="5" />
  </svg>
);

const Home = () => {
  return (
    <AnimatedPage className="bg-white">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-normal text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Lost Something? We'll Help You Find It.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            LostMate connects students with reported lost and found items quickly, clearly, and without the usual campus notice-board chaos.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/report-lost" className="case-button">
              Report Lost / Found
            </Link>
            <Link to="/lost" className="case-button secondary">
              Browse Items
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroIllustration />
        </div>
      </section>

      <section id="about" className="border-t border-[var(--line)] bg-[var(--paper-soft)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            ['Report', 'Submit lost or found item details with a photo and last-seen location.'],
            ['Match', 'Browse verified listings and spot likely matches faster.'],
            ['Return', 'Use the dashboard to track status until the item gets home.'],
          ].map(([title, description]) => (
            <article key={title} className="case-card p-6">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="body-copy mt-3 text-sm">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Home;
