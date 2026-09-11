import React, { useState } from 'react';
import { fetchApi } from '../../shared/api-client';
import { theme } from '../../shared/theme';

const CATEGORIES = [
  'Education', 'Agriculture', 'Healthcare', 'Water Resources', 
  'Environment', 'Energy', 'Urban Development', 'Accessibility', 
  'Public Administration', 'Rural Livelihoods'
];

export default function CitizenSubmission({ onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    affectedPopulationEstimate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      // Mock location for now, in a real app use geolocation API
      const payload = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [85.3096, 23.3441] // Ranchi longitude, latitude
        }
      };

      await fetchApi('/problems', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-center mt-10 border-t-4" style={{ borderColor: theme.colors.secondary }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.secondary }}>Submission Successful!</h2>
        <p className="text-gray-600 mb-6">Your problem has been recorded. Thank you for your contribution!</p>
        <button 
          onClick={onBack}
          className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold" style={{ color: theme.colors.textNavy }}>Report a Problem</h2>
        <button onClick={onBack} className="text-sm font-semibold text-gray-500 hover:text-gray-800">
          Cancel
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="E.g., Broken water pipe in main street"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-24"
            placeholder="Provide details about the issue..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a Category...</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Estimated Affected Population</label>
          <input
            name="affectedPopulationEstimate"
            type="number"
            value={formData.affectedPopulationEstimate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., 500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white font-bold py-3 px-4 rounded mt-4"
          style={{ backgroundColor: theme.colors.primary, opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
