import React from 'react';
import { Link } from 'react-router-dom';

export const PageShell = ({ eyebrow, title, description, children, className = '' }) => (
  <section className={`w-full px-4 py-8 sm:px-6 sm:py-12 ${className}`}>
    <div className="mx-auto w-full max-w-6xl">
      {(eyebrow || title || description) && (
        <header className="mb-8 max-w-3xl pb-2">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && <h1 className="text-4xl font-extrabold leading-[1.06] sm:text-5xl">{title}</h1>}
          {description && <p className="body-copy mt-4 max-w-2xl">{description}</p>}
        </header>
      )}
      {children}
    </div>
  </section>
);

export const AuthShell = ({ eyebrow, title, description, children }) => (
  <section className="grid min-h-[calc(100vh-4rem)] w-full place-items-center bg-[var(--paper-soft)] px-4 py-10">
    <div className="w-full max-w-md">
      <div className="mb-7 text-center">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
        <p className="body-copy mt-3">{description}</p>
      </div>
      <div className="page-panel p-6 sm:p-8">{children}</div>
    </div>
  </section>
);

export const Field = ({ label, children }) => (
  <label className="block">
    <span className="form-label">{label}</span>
    {children}
  </label>
);

export const Message = ({ tone = 'neutral', children }) => {
  const toneClass = tone === 'error' ? 'text-[var(--danger)]' : tone === 'success' ? 'text-[var(--signal)]' : '';
  return <div className={`alert ${toneClass}`}>{children}</div>;
};

export const CaseButton = ({ children, className = '', variant = 'primary', ...props }) => (
  <button className={`case-button ${variant === 'secondary' ? 'secondary' : ''} ${className}`} {...props}>
    {children}
  </button>
);

export const CaseLink = ({ children, className = '', variant = 'primary', ...props }) => (
  <Link className={`case-button case-link ${variant === 'secondary' ? 'secondary' : ''} ${className}`} {...props}>
    {children}
  </Link>
);

export const StatusBadge = ({ status = 'pending' }) => (
  <span className={`status-stamp ${status}`}>{status}</span>
);

export const ItemCard = ({ item }) => {
  return (
  <Link to={`/items/${item._id || item.id}`} className="block">
    <article className="case-card flex h-full min-h-64 flex-col overflow-hidden">
      <img
        src={item.image}
        alt={item.title ? `${item.title} item preview` : 'Lost and found item preview'}
        className="h-48 w-full border-b border-[var(--line)] object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold leading-tight">{item.title}</h3>
          <StatusBadge status={item.status} />
        </div>
        <p className="body-copy mt-4 flex-1 text-[0.96rem]">{item.description || 'No description provided.'}</p>
        <div className="mt-6 border-t border-[var(--line)] pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Last seen</p>
          <p className="mt-1 font-semibold">{item.location}</p>
        </div>
      </div>
    </article>
  </Link>
  );
};

export const EmptyState = ({ children }) => (
  <div className="page-panel grid min-h-56 place-items-center p-8 text-center">
    <p className="body-copy">{children}</p>
  </div>
);
