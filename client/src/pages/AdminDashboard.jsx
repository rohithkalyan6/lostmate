import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { CaseButton, EmptyState, Message, PageShell, StatusBadge } from '../components/ui';
import { normalizeItems } from '../services/api';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/items/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        console.log("AdminDashboard API response:", response.data);
        const normalizedItems = normalizeItems(response.data);
        if (normalizedItems.length > 0) {
          console.log("AdminDashboard first item:", normalizedItems[0]);
          console.log("AdminDashboard first item image:", normalizedItems[0].image);
          console.log("AdminDashboard first item imageUrl:", response.data[0]?.imageUrl);
        }
        setItems(normalizedItems);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch pending items');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingItems();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('token');
      if (action === 'approve') {
        await axios.put(`http://localhost:5000/api/items/approve/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (action === 'reject') {
        await axios.delete(`http://localhost:5000/api/items/reject/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      // Remove item from UI after action
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} item`);
    }
  };

  if (loading) {
    return (
      <AnimatedPage className="grid min-h-screen place-items-center px-4 py-12">
        <p className="eyebrow">Loading pending items...</p>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <PageShell
        eyebrow="Admin Queue"
        title="Pending review."
        description={`${items.length} item${items.length === 1 ? '' : 's'} waiting for a decision before they appear on the public board.`}
      >
        {error ? (
          <Message tone="error">{error}</Message>
        ) : items.length === 0 ? (
          <EmptyState>No pending items to review at the moment.</EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {items.map((item) => {
              console.log(item);
              console.log(item.image);

              return (
              <article key={item._id} className="case-card flex flex-col justify-between p-6">
                <div>
                  <img
                    src={item.image}
                    alt={`${item.title} item preview`}
                    className="-mx-6 -mt-6 mb-5 h-44 w-[calc(100%+3rem)] border-b border-[var(--line-strong)] object-cover"
                    loading="lazy"
                  />
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-3xl font-bold leading-tight">{item.title}</h3>
                    <StatusBadge status="pending" />
                  </div>
                  <p className="body-copy line-clamp-3">{item.description}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Type</dt>
                      <dd className="mt-1 font-semibold capitalize">{item.type}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Location</dt>
                      <dd className="mt-1 font-semibold">{item.location}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4">
                  <CaseButton onClick={() => handleAction(item._id, 'approve')}>Approve</CaseButton>
                  <CaseButton variant="secondary" onClick={() => handleAction(item._id, 'reject')}>Reject</CaseButton>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </PageShell>
    </AnimatedPage>
  );
};

export default AdminDashboard;
