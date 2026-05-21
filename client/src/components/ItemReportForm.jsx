import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaseButton, Field, Message, PageShell } from './ui';
import { ITEMS_API_URL } from '../services/api';

const initialFormData = {
  title: '',
  description: '',
  category: 'id-card',
  location: '',
  itemSize: 'small',
  image: null,
};

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxImageSize = 5 * 1024 * 1024;

const copy = {
  lost: {
    eyebrow: 'Missing Item Intake',
    title: 'Report lost item.',
    description: 'Give the case desk enough detail to recognize the item when a matching found report appears.',
    locationLabel: 'Location Lost',
    locationPlaceholder: 'e.g. Main Library, 2nd Floor',
    titlePlaceholder: 'e.g. Blue Backpack',
    descriptionPlaceholder: 'Describe the item in detail...',
    success: 'Lost item reported successfully!',
    redirectTo: '/lost',
  },
  found: {
    eyebrow: 'Recovered Item Intake',
    title: 'Report found item.',
    description: 'Thank you for securing a lost item. Add the important details so staff can verify and publish it.',
    locationLabel: 'Location Found',
    locationPlaceholder: 'e.g. Computer Lab 3',
    titlePlaceholder: 'e.g. Set of Keys',
    descriptionPlaceholder: 'Describe the item, including distinct features...',
    success: 'Found item reported successfully!',
    redirectTo: '/found',
  },
};

const ItemReportForm = ({ type }) => {
  const navigate = useNavigate();
  const content = copy[type];
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];

      if (!file) {
        setFormData((current) => ({ ...current, image: null }));
        return;
      }

      if (!allowedImageTypes.includes(file.type)) {
        setError('Only jpg, jpeg, png, and webp images are allowed');
        e.target.value = '';
        return;
      }

      if (file.size > maxImageSize) {
        setError('Image size must be 5MB or less');
        e.target.value = '';
        return;
      }
    }

    setError('');
    setFormData((current) => ({
      ...current,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries({ ...formData, type }).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      console.log("--- Frontend Form Submission ---");
      for (let [key, value] of data.entries()) {
        console.log(key, ":", value);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(`${ITEMS_API_URL}/report`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setSuccess(content.success);
      setFormData(initialFormData);
      e.currentTarget.reset();
      setTimeout(() => navigate(content.redirectTo), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} description={content.description}>
      <form onSubmit={handleSubmit} className="page-panel mx-auto max-w-2xl space-y-6 p-6 sm:p-8">
        {error && <Message tone="error">{error}</Message>}
        {success && <Message tone="success">{success}</Message>}

        <Field label="Title">
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder={content.titlePlaceholder}
            className="case-field"
          />
        </Field>

        <Field label="Description">
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder={content.descriptionPlaceholder}
            className="case-field resize-y"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Category">
            <select name="category" value={formData.category} onChange={handleChange} className="case-field">
              <option value="id-card">ID Card</option>
              <option value="keys">Keys</option>
              <option value="electronics">Electronics</option>
              <option value="wallet">Wallet</option>
              <option value="others">Others</option>
            </select>
          </Field>
          <Field label="Item Size / Type">
            <select name="itemSize" value={formData.itemSize} onChange={handleChange} className="case-field">
              <option value="small">Small</option>
              <option value="valuable">Valuable</option>
            </select>
          </Field>
        </div>

        <Field label={content.locationLabel}>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder={content.locationPlaceholder}
            className="case-field"
          />
        </Field>

        <Field label="Upload Image">
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="case-field text-sm file:mr-4 file:rounded file:border-0 file:bg-[var(--ink)] file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:tracking-[0.08em] file:text-[var(--paper-soft)]"
          />
          <span className="mt-2 block text-sm text-[var(--muted)]">JPG, PNG, or WebP. Max 5MB.</span>
        </Field>

        <CaseButton type="submit" disabled={loading} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Submitting...' : 'Submit Report'}
        </CaseButton>
      </form>
    </PageShell>
  );
};

export default ItemReportForm;
