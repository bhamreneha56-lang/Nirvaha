import { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5000/api';

export function useProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${API}/problems`);
      const data = await res.json();
      // Map MongoDB _id to id, map location coordinates to lat/lng for backwards compatibility with frontend mock format
      const mapped = data.map(p => ({
        ...p,
        id: p.problemIdReadable || p._id,
        lat: p.location?.coordinates?.[1] || 23.3,
        lng: p.location?.coordinates?.[0] || 85.3,
        location: [p.block, p.district].filter(Boolean).join(', ') || 'Unknown Location',
        severity: p.aiPriority || 'Medium',
        priority: p.aiPriority || 'Medium',
        reportedOn: p.createdAt,
        submitter: p.submittedBy?.name || (p.isAnonymous ? 'Anonymous' : 'Citizen')
      }));
      setProblems(mapped);
    } catch (err) {
      console.error('Failed to fetch problems', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { problems, loading, refresh };
}
