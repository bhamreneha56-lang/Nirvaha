import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PRIORITY_COLORS = {
  Critical: { dot: '#ef4444', fill: 'rgba(239,68,68,0.18)', border: '#ef4444' },
  High:     { dot: '#f97316', fill: 'rgba(249,115,22,0.15)', border: '#f97316' },
  Medium:   { dot: '#eab308', fill: 'rgba(234,179,8,0.15)',  border: '#eab308' },
  Low:      { dot: '#22c55e', fill: 'rgba(34,197,94,0.12)',  border: '#22c55e' },
};

// Jharkhand district coordinates — used to plot problems that only carry a district name
const DISTRICT_COORDS = {
  'Ranchi':                       [23.3441, 85.3096],
  'Dhanbad':                      [23.7957, 86.4304],
  'East Singhbhum':               [22.8046, 86.2029],
  'Jamshedpur':                   [22.8046, 86.2029],
  'Bokaro':                       [23.6693, 86.1511],
  'Hazaribagh':                   [23.9925, 85.3637],
  'Deoghar':                      [24.4826, 86.6974],
  'Giridih':                      [24.1904, 86.3021],
  'Ramgarh':                      [23.6334, 85.5146],
  'Dumka':                        [24.2676, 87.2517],
  'Palamu':                       [24.0375, 84.0722],
  'Medininagar':                  [24.0375, 84.0722],
  'West Singhbhum':               [22.5539, 85.8077],
  'Chaibasa':                     [22.5539, 85.8077],
  'Gumla':                        [23.0440, 84.5414],
  'Lohardaga':                    [23.4357, 84.6811],
  'Simdega':                      [22.6167, 84.5000],
  'Latehar':                      [23.7431, 84.5028],
  'Garhwa':                       [24.1600, 83.8100],
  'Chatra':                       [24.2100, 84.8700],
  'Koderma':                      [24.4682, 85.5936],
  'Jamtara':                      [23.9629, 86.8014],
  'Godda':                        [24.8267, 87.2144],
  'Sahibganj':                    [25.2425, 87.6433],
  'Pakur':                        [24.6341, 87.8492],
  'Khunti':                       [23.0726, 85.2789],
  'Saraikela Kharsawan':          [22.7000, 85.9300],
};

/** Resolve [lat, lng] for a problem, with a small random jitter so markers don't stack. */
function resolveCoords(problem) {
  if (problem.lat && problem.lng) return [problem.lat, problem.lng];
  // Try to match district field against known coords
  const key = Object.keys(DISTRICT_COORDS).find((k) =>
    problem.district?.toLowerCase().includes(k.toLowerCase())
  );
  if (!key) return null;
  const [lat, lng] = DISTRICT_COORDS[key];
  // Small random offset (±0.05°) so stacked markers spread out slightly
  return [lat + (Math.random() - 0.5) * 0.1, lng + (Math.random() - 0.5) * 0.1];
}


const createColoredMarker = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};
      border:2px solid white;
      box-shadow:0 0 0 3px ${color}55,0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

export default function CitizenChallengesMap({ problems = [] }) {
  const [filter, setFilter] = useState('All');
  const PRIORITIES = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const visible = problems.filter(
    (p) => filter === 'All' || p.priority === filter
  );

  // Pre-resolve coordinates once per problems array — jitter is stable
  const resolvedProblems = React.useMemo(
    () =>
      problems.map((p) => ({ ...p, _coords: resolveCoords(p) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [problems]
  );

  const visibleResolved = resolvedProblems.filter(
    (p) => (filter === 'All' || p.priority === filter) && p._coords
  );

  const center = [23.6102, 85.2799]; // Jharkhand centre

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-blue-100 shadow-sm" style={{ height: '100%' }}>
      {/* Filter chips */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap gap-1.5 pointer-events-auto">
        {PRIORITIES.map((p) => {
          const col = PRIORITY_COLORS[p];
          const active = filter === p;
          return (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all shadow-sm ${
                active
                  ? 'bg-blue-600 text-white border-slate-900'
                  : 'bg-white/95 text-black border-blue-100 hover:border-slate-400'
              }`}
            >
              {col && (
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: col.dot }}
                />
              )}
              {p}
            </button>
          );
        })}
      </div>

      {/* Issue count badge */}
      <div className="absolute bottom-10 left-3 z-[400] bg-white/95 backdrop-blur-sm border border-blue-100 rounded-lg px-3 py-1.5 shadow-sm text-[11px] font-semibold text-black">
        {visibleResolved.length} issue{visibleResolved.length !== 1 ? 's' : ''} shown
      </div>

      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <ZoomControl position="bottomright" />

        {/* OpenStreetMap tiles — free, no API key needed */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visibleResolved.map((p) => {
          const col = PRIORITY_COLORS[p.priority] || PRIORITY_COLORS.Low;
          const icon = createColoredMarker(col.dot);
          return (
            <React.Fragment key={p.id}>
              <Circle
                center={p._coords}
                radius={1800}
                pathOptions={{
                  color: col.border,
                  fillColor: col.fill,
                  fillOpacity: 1,
                  weight: 1.5,
                  dashArray: '4 4',
                }}
              />
              <Marker position={p._coords} icon={icon}>
                <Popup>
                  <div className="w-48 text-black text-xs font-sans p-0.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: col.dot }}
                      />
                      <span className="font-mono text-[10px] text-black">{p.id}</span>
                      <span
                        className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                        style={{ background: col.dot }}
                      >
                        {p.priority}
                      </span>
                    </div>
                    <div className="font-bold text-[13px] text-black mb-0.5 leading-snug">{p.title}</div>
                    <div className="text-[11px] text-black mb-2">{p.district} · {p.domain || p.category}</div>
                    <div className="text-[11px] text-black border-t border-blue-100 pt-1.5">
                      Status: <span className="font-semibold text-black">{p.status}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
