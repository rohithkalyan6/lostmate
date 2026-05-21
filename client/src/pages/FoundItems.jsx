import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { EmptyState, ItemCard, Message, PageShell } from '../components/ui';
import { ITEMS_API_URL, normalizeItems } from '../services/api';

const FoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${ITEMS_API_URL}/found`);
        console.log(response.data);
        console.log("FoundItems API response:", response.data);
        const normalizedItems = normalizeItems(response.data);
        if (normalizedItems.length > 0) {
          console.log("First item:", normalizedItems[0]);
          console.log("First item image:", normalizedItems[0].image);
          console.log("First item imageUrl:", response.data[0]?.imageUrl);
        }
        setItems(normalizedItems);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load found items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <AnimatedPage>
      <PageShell
        eyebrow="Recovered Inventory"
        title="Found items."
        description="Verified objects currently waiting for their owners to identify and claim them."
      >
        {loading ? (
          <EmptyState>Loading found items...</EmptyState>
        ) : error ? (
          <Message tone="error">{error}</Message>
        ) : items.length === 0 ? (
          <EmptyState>No found items have been reported yet.</EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </PageShell>
    </AnimatedPage>
  );
};

export default FoundItems;
