import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { EmptyState, Message, PageShell, StatusBadge } from '../components/ui';
import { ITEMS_API_URL, normalizeItem } from '../services/api';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${ITEMS_API_URL}/${id}`);
        console.log(response.data);
        console.log("ItemDetails API response:", response.data);
        const normalizedItem = normalizeItem(response.data);
        console.log(normalizedItem);
        console.log(normalizedItem?.image);
        console.log("ItemDetails item:", normalizedItem);
        console.log("ItemDetails item image:", normalizedItem?.image);
        console.log("ItemDetails item imageUrl:", response.data?.imageUrl);
        setItem(normalizedItem);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <AnimatedPage>
        <PageShell>
          <EmptyState>Loading item details...</EmptyState>
        </PageShell>
      </AnimatedPage>
    );
  }

  if (error || !item) {
    return (
      <AnimatedPage>
        <PageShell>
          <Message tone="error">{error || 'Item not found'}</Message>
        </PageShell>
      </AnimatedPage>
    );
  }

  console.log(item);
  console.log(item.image);

  return (
    <AnimatedPage>
      <PageShell
        eyebrow={`${item.type} case`}
        title={item.title}
        description="Review the image and case details before contacting the campus lost-and-found desk."
      >
        <article className="page-panel overflow-hidden">
          <img
            src={item.image}
            alt={`${item.title} item preview`}
            className="h-72 w-full border-b border-[var(--line-strong)] object-cover sm:h-96"
          />

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_18rem]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StatusBadge status={item.status} />
                <span className="status-stamp">{item.category || 'others'}</span>
                <span className="status-stamp">{item.itemSize}</span>
              </div>
              <p className="body-copy text-lg">{item.description || 'No description provided.'}</p>
            </div>

            <dl className="grid gap-4 border-t border-[var(--line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Location</dt>
                <dd className="mt-1 text-lg font-semibold">{item.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Report Type</dt>
                <dd className="mt-1 text-lg font-semibold capitalize">{item.type}</dd>
              </div>
              {item.reportedBy?.email && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Reported By</dt>
                  <dd className="mt-1 break-words text-lg font-semibold">{item.reportedBy.email}</dd>
                </div>
              )}
            </dl>
          </div>
        </article>

        <Link to={item.type === 'found' ? '/found' : '/lost'} className="mt-6 inline-flex font-bold underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]">
          Back to {item.type === 'found' ? 'found' : 'lost'} items
        </Link>
      </PageShell>
    </AnimatedPage>
  );
};

export default ItemDetails;
