import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { EmptyState, ItemCard, Message, PageShell } from '../components/ui';
import { ITEMS_API_URL, normalizeItems } from '../services/api';

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${ITEMS_API_URL}/lost`);
        console.log(response.data);
        console.log("LostItems API response:", response.data);
        const normalizedItems = normalizeItems(response.data);
        if (normalizedItems.length > 0) {
          console.log("First lost item:", normalizedItems[0]);
          console.log("First lost item image:", normalizedItems[0].image);
          console.log("First lost item imageUrl:", response.data[0]?.imageUrl);
        }
        setItems(normalizedItems);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load lost items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <AnimatedPage>
      <PageShell
        eyebrow="Open Missing Cases"
        title="Lost items."
        description="A clean board of reports waiting to be matched with recovered goods."
      >
        {loading ? (
          <EmptyState>Loading lost items...</EmptyState>
        ) : error ? (
          <Message tone="error">{error}</Message>
        ) : items.length === 0 ? (
          <EmptyState>No lost items have been reported yet.</EmptyState>
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

export default LostItems;
