import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSimulation } from '../../context/SimulationContext';
import { 
  Layers, 
  MapPin, 
  Target, 
  FileStack, 
  ShieldAlert, 
  Activity, 
  Compass, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Briefcase,
  Crosshair,
  Maximize2
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// All 24 Districts of Jharkhand with exact coordinates
export const JHARKHAND_DISTRICTS = [
  { name: 'All Districts', lat: 23.6102, lng: 85.2799, zoom: 8 },
  { name: 'Ranchi', lat: 23.3441, lng: 85.3096, zoom: 12 },
  { name: 'Dhanbad', lat: 23.7957, lng: 86.4304, zoom: 12 },
  { name: 'East Singhbhum (Jamshedpur)', lat: 22.8046, lng: 86.2029, zoom: 12 },
  { name: 'Bokaro', lat: 23.6693, lng: 86.1511, zoom: 12 },
  { name: 'Hazaribagh', lat: 23.9925, lng: 85.3637, zoom: 12 },
  { name: 'Deoghar', lat: 24.4826, lng: 86.6974, zoom: 12 },
  { name: 'Giridih', lat: 24.1904, lng: 86.3021, zoom: 12 },
  { name: 'Ramgarh', lat: 23.6334, lng: 85.5146, zoom: 12 },
  { name: 'Dumka', lat: 24.2676, lng: 87.2517, zoom: 12 },
  { name: 'Palamu (Medininagar)', lat: 24.0375, lng: 84.0722, zoom: 12 },
  { name: 'West Singhbhum (Chaibasa)', lat: 22.5539, lng: 85.8077, zoom: 12 },
  { name: 'Gumla', lat: 23.0440, lng: 84.5414, zoom: 12 },
  { name: 'Lohardaga', lat: 23.4357, lng: 84.6811, zoom: 12 },
  { name: 'Simdega', lat: 22.6167, lng: 84.5000, zoom: 12 },
  { name: 'Latehar', lat: 23.7431, lng: 84.5028, zoom: 12 },
  { name: 'Garhwa', lat: 24.1600, lng: 83.8100, zoom: 12 },
  { name: 'Chatra', lat: 24.2100, lng: 84.8700, zoom: 12 },
  { name: 'Koderma', lat: 24.4682, lng: 85.5936, zoom: 12 },
  { name: 'Jamtara', lat: 23.9629, lng: 86.8014, zoom: 12 },
  { name: 'Godda', lat: 24.8267, lng: 87.2144, zoom: 12 },
  { name: 'Sahibganj', lat: 25.2425, lng: 87.6433, zoom: 12 },
  { name: 'Pakur', lat: 24.6341, lng: 87.8492, zoom: 12 },
  { name: 'Khunti', lat: 23.0726, lng: 85.2789, zoom: 12 },
  { name: 'Saraikela Kharsawan', lat: 22.7000, lng: 85.9300, zoom: 12 }
];

// Rich custom markers with 3D shadow halos
const createPulsingMarker = (bgGradient, borderColor, shadowColor, glyph) => {
  return L.divIcon({
    className: 'tactical-marker',
    html: `
      <div style="
        position: relative;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: ${shadowColor};
          opacity: 0.35;
          animation: live-ping-slow 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        "></div>
        <div style="
          position: relative;
          width: 22px;
          height: 22px;
          background: ${bgGradient};
          border: 2px solid ${borderColor};
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 900;
          font-family: monospace;
        ">
          ${glyph}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

const iconGrievanceCrit = createPulsingMarker('linear-gradient(135deg, #ef4444, #991b1b)', '#ffffff', 'rgba(239, 68, 68, 0.8)', '!');
const iconGrievanceHigh = createPulsingMarker('linear-gradient(135deg, #f97316, #c2410c)', '#ffffff', 'rgba(249, 115, 22, 0.8)', '▲');
const iconCluster = createPulsingMarker('linear-gradient(135deg, #dc2626, #7f1d1d)', '#fef08a', 'rgba(220, 38, 38, 0.9)', '⚡');
const iconRisk = createPulsingMarker('linear-gradient(135deg, #6366f1, #3730a3)', '#ffffff', 'rgba(99, 102, 241, 0.8)', '◉');
const iconDisputed = createPulsingMarker('linear-gradient(135deg, #eab308, #854d0e)', '#ffffff', 'rgba(234, 179, 8, 0.8)', '?');
const iconChallenge = createPulsingMarker('linear-gradient(135deg, #8b5cf6, #5b21b6)', '#ffffff', 'rgba(139, 92, 246, 0.8)', '★');
const iconProject = createPulsingMarker('linear-gradient(135deg, #10b981, #065f46)', '#ffffff', 'rgba(16, 185, 129, 0.8)', '✓');

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.8, easeLinearity: 0.25 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function GISMap({ 
  height = '100%', 
  showExpandedControls = true,
  selectedDistrictProp = null,
  onDistrictSelect = null 
}) {
  const { state, dispatch } = useSimulation();
  const { problems, challenges } = state;

  // 6 Toggleable Layer Chips state
  const [layers, setLayers] = useState({
    grievances: true,
    clusters: true,
    risks: true,
    disputed: true,
    challenges: true,
    projects: true
  });

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Selected District state
  const [selectedDistrictName, setSelectedDistrictName] = useState(selectedDistrictProp || 'Ranchi');

  useEffect(() => {
    if (selectedDistrictProp) {
      setSelectedDistrictName(selectedDistrictProp);
    }
  }, [selectedDistrictProp]);

  const activeDistrict = useMemo(() => {
    return JHARKHAND_DISTRICTS.find((d) => d.name === selectedDistrictName) || JHARKHAND_DISTRICTS[1];
  }, [selectedDistrictName]);

  const handleDistrictChange = (e) => {
    const name = e.target.value;
    setSelectedDistrictName(name);
    if (onDistrictSelect) {
      onDistrictSelect(name);
    }
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: `GIS Telemetry Panned: ${name}`,
        message: `Satellite radar locks on ${name} surveillance corridor.`,
        type: 'info'
      }
    });
  };

  // Simulated Systemic Clusters data
  const systemicClusters = useMemo(() => [
    {
      id: 'CLUST-RNC-01',
      title: 'Water Contamination & Typhoid Surge',
      district: 'Ranchi',
      lat: 23.3485,
      lng: 85.3120,
      radius: 4500,
      cases: 47,
      confidence: 94,
      department: 'PHED (Water)'
    },
    {
      id: 'CLUST-DHN-02',
      title: 'Arterial Road Cavities Hotspot',
      district: 'Dhanbad',
      lat: 23.7990,
      lng: 86.4350,
      radius: 3800,
      cases: 32,
      confidence: 91,
      department: 'Roads & Infra'
    },
    {
      id: 'CLUST-JSR-03',
      title: 'Industrial Runoff Sensor Inversion',
      district: 'East Singhbhum (Jamshedpur)',
      lat: 22.8100,
      lng: 86.2100,
      radius: 5200,
      cases: 29,
      confidence: 88,
      department: 'Pollution Control'
    }
  ], []);

  // Simulated Predictive Risks data
  const predictiveRisks = useMemo(() => [
    {
      id: 'RISK-RNC-401',
      title: 'Subarnarekha River Basin Monsoon Inundation',
      district: 'Ranchi',
      lat: 23.3600,
      lng: 85.3500,
      radius: 6500,
      riskScore: 84,
      timeHorizon: 'Next 48 Hours',
      threat: 'Flood Overflow'
    },
    {
      id: 'RISK-DHN-402',
      title: 'Underground Methane Leakage Probability',
      district: 'Dhanbad',
      lat: 23.7700,
      lng: 86.4100,
      radius: 4200,
      riskScore: 79,
      timeHorizon: 'Next 5 Days',
      threat: 'Mine Gas Subsidence'
    }
  ], []);

  // Simulated Disputed Cases (Outcome Verification pending/failed)
  const disputedCases = useMemo(() => [
    {
      id: 'DISP-881',
      title: 'Disputed Pipeline Leakage Repair',
      district: 'Ranchi',
      location: 'Doranda Ward 14',
      lat: 23.3280,
      lng: 85.3190,
      citizenComment: 'Water is still murky yellow; photo proof uploaded by 12 residents.'
    },
    {
      id: 'DISP-882',
      title: 'Premature Pothole Patching Sign-off',
      district: 'Bokaro',
      location: 'Sector 4 Junction',
      lat: 23.6650,
      lng: 86.1450,
      citizenComment: 'Bitumen washed away in single thunderstorm.'
    }
  ], []);

  // Simulated Active Solution Projects
  const activeProjects = useMemo(() => [
    {
      id: 'PRJ-JH-01',
      title: 'IoT Telemetry Water Quality Drone Station',
      partner: 'IIT (ISM) Dhanbad + Tata Steel CSR',
      lat: 23.3350,
      lng: 85.2950,
      status: 'PILOT_ACTIVE',
      completion: 68
    },
    {
      id: 'PRJ-JH-02',
      title: 'Recycled Polymer Pothole Seal Deployment',
      partner: 'BIT Mesra Innovation Lab',
      lat: 23.8100,
      lng: 86.4400,
      status: 'DEPLOYED',
      completion: 95
    }
  ], []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl z-0 bg-slate-50"
      style={{ height: height }}
    >
      {/* 3D Radar Wave Scanning Overlay in top right */}
      <div className="absolute top-4 right-4 z-[400] pointer-events-none hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-xl shadow-lg">
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <div className="radar-pulse-ring !border-emerald-500/50"></div>
        </div>
        <div className="text-left font-mono">
          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">GIS RADAR SWEEP</div>
          <div className="text-[11px] text-emerald-700 font-bold tracking-wider">SCANNING JHARKHAND</div>
        </div>
      </div>

      {/* Top Left: District Selector & Coordinate HUD */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 max-w-[340px] pointer-events-none">
        {/* District Selector Card */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-xl text-slate-800 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-amber-700 uppercase">
              <Compass size={13} className="text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
              DISTRICT RADAR SELECTOR
            </span>
            <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[9px] font-bold">
              24 COUNCILS
            </span>
          </div>

          <select
            value={selectedDistrictName}
            onChange={handleDistrictChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            {JHARKHAND_DISTRICTS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name} {d.name !== 'All Districts' ? `(District Deck)` : ''}
              </option>
            ))}
          </select>

          {/* Coordinate Telemetry readout */}
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <div>
              <span className="text-slate-400">LAT:</span>{' '}
              <span className="text-amber-700 font-bold">{activeDistrict.lat.toFixed(4)}°N</span>
            </div>
            <div>
              <span className="text-slate-400">LNG:</span>{' '}
              <span className="text-amber-700 font-bold">{activeDistrict.lng.toFixed(4)}°E</span>
            </div>
            <div>
              <span className="text-slate-400">ZOOM:</span>{' '}
              <span className="text-emerald-700 font-bold">{activeDistrict.zoom}x</span>
            </div>
          </div>
        </div>

        {/* 6 Toggleable Layer Chips */}
        {showExpandedControls && (
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-2.5 shadow-xl text-slate-800 pointer-events-auto">
            <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1"><Layers size={11} className="text-blue-600"/> INTELLIGENCE LAYERS</span>
              <span className="text-blue-600 font-bold">TOGGLE ON/OFF</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* 1. Grievances */}
              <button
                onClick={() => toggleLayer('grievances')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.grievances 
                    ? 'bg-red-50 border-red-300 text-red-700 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Grievances ({problems.length})</span>
              </button>

              {/* 2. Systemic Clusters */}
              <button
                onClick={() => toggleLayer('clusters')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.clusters 
                    ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Clusters ({systemicClusters.length})</span>
              </button>

              {/* 3. Predictive Risks */}
              <button
                onClick={() => toggleLayer('risks')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.risks 
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Risks ({predictiveRisks.length})</span>
              </button>

              {/* 4. Disputed Cases */}
              <button
                onClick={() => toggleLayer('disputed')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.disputed 
                    ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Disputed ({disputedCases.length})</span>
              </button>

              {/* 5. Master Challenges */}
              <button
                onClick={() => toggleLayer('challenges')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.challenges 
                    ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Challenges ({challenges.length})</span>
              </button>

              {/* 6. Active Projects */}
              <button
                onClick={() => toggleLayer('projects')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  layers.projects 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Projects ({activeProjects.length})</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Leaflet Map Engine */}
      <MapContainer
        center={[activeDistrict.lat, activeDistrict.lng]}
        zoom={activeDistrict.zoom}
        style={{ height: '100%', width: '100%', background: '#f8fafc' }}
        zoomControl={false}
      >
        <MapController center={[activeDistrict.lat, activeDistrict.lng]} zoom={activeDistrict.zoom} />
        <ZoomControl position="bottomright" />

        {/* High-quality Light Standard Map: Esri World Street Map (Crisp Google Maps Look) */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {/* LAYER 1: GRIEVANCES */}
        {layers.grievances && problems.map((p) => {
          const icon = p.severity === 'Critical' ? iconGrievanceCrit : iconGrievanceHigh;
          return (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup className="custom-popup">
                <div className="text-slate-900 w-52 p-1 font-sans">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-black text-red-600 uppercase tracking-widest">{p.id}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded text-white ${p.severity === 'Critical' ? 'bg-red-600' : 'bg-orange-600'}`}>
                      {p.severity}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 mb-1 leading-snug">{p.title}</div>
                  <div className="text-[11px] text-slate-500 mb-2">{p.district} • {p.category}</div>
                  
                  <div className="bg-slate-100 p-2 rounded-lg border border-slate-200 mb-2.5 text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Priority Score:</span>
                      <span className="font-mono font-black text-red-600">{p.priorityScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">AI Confidence:</span>
                      <span className="font-mono font-black text-sky-600">{p.aiConfidence || 89}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id })}
                    className="w-full bg-slate-900 hover:bg-black text-white text-[10px] font-bold py-1.5 rounded-lg shadow transition-colors flex items-center justify-center gap-1"
                  >
                    <Crosshair size={12} className="text-amber-400" />
                    Open Case Drawer
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* LAYER 2: SYSTEMIC CLUSTERS */}
        {layers.clusters && systemicClusters.map((c) => (
          <React.Fragment key={c.id}>
            <Circle
              center={[c.lat, c.lng]}
              radius={c.radius}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.18,
                dashArray: '6, 6',
                weight: 2
              }}
            />
            <Marker position={[c.lat, c.lng]} icon={iconCluster}>
              <Popup className="custom-popup">
                <div className="text-slate-900 w-52 p-1">
                  <div className="text-[9px] font-mono font-black text-rose-600 uppercase tracking-widest mb-1">
                    DBSCAN CLUSTER · {c.id}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 mb-1">{c.title}</div>
                  <div className="text-[10px] text-slate-600 mb-2">
                    {c.cases} linked citizen grievances detected within {(c.radius/1000).toFixed(1)}km radius.
                  </div>
                  <button
                    onClick={() => dispatch({
                      type: 'START_WORKFLOW',
                      payload: { action: 'CREATE_MASTER_CHALLENGE', clusterId: c.id, title: c.title, location: c.district }
                    })}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-[10px] font-bold py-1.5 rounded-lg shadow transition-all"
                  >
                    Convert to Master Challenge
                  </button>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* LAYER 3: PREDICTIVE RISKS */}
        {layers.risks && predictiveRisks.map((r) => (
          <React.Fragment key={r.id}>
            <Circle
              center={[r.lat, r.lng]}
              radius={r.radius}
              pathOptions={{
                color: '#6366f1',
                fillColor: '#6366f1',
                fillOpacity: 0.22,
                weight: 2
              }}
            />
            <Marker position={[r.lat, r.lng]} icon={iconRisk}>
              <Popup className="custom-popup">
                <div className="text-slate-900 w-52 p-1">
                  <div className="flex items-center gap-1 text-[9px] font-mono font-black text-indigo-600 uppercase tracking-widest mb-1">
                    <Zap size={10} /> PREDICTIVE EARLY WARNING
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 mb-1">{r.title}</div>
                  <div className="text-[10px] text-slate-600 mb-2">
                    Threat: <span className="font-bold text-indigo-700">{r.threat}</span> ({r.timeHorizon})
                  </div>
                  <button
                    onClick={() => dispatch({
                      type: 'ADD_TOAST',
                      payload: {
                        title: 'Preventive Crew Deployed',
                        message: `SDRF & Municipal drainage teams dispatched to ${r.district}.`,
                        type: 'warning'
                      }
                    })}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors"
                  >
                    Deploy Preventive Protocol
                  </button>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* LAYER 4: DISPUTED CASES */}
        {layers.disputed && disputedCases.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={iconDisputed}>
            <Popup className="custom-popup">
              <div className="text-slate-900 w-52 p-1">
                <div className="text-[9px] font-mono font-black text-amber-600 uppercase tracking-widest mb-1">
                  OUTCOME DISPUTED · {d.id}
                </div>
                <div className="font-extrabold text-sm text-slate-900 mb-1">{d.title}</div>
                <div className="text-[10px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200 mb-2">
                  "{d.citizenComment}"
                </div>
                <button
                  onClick={() => dispatch({
                    type: 'ADD_TOAST',
                    payload: {
                      title: 'Independent Inspection Ordered',
                      message: `Senior inspector assigned to re-verify ${d.id} on-ground.`,
                      type: 'error'
                    }
                  })}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors"
                >
                  Order Physical Re-Audit
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* LAYER 5: MASTER CHALLENGES */}
        {layers.challenges && challenges.map((ch) => (
          <Marker key={ch.id} position={[ch.lat, ch.lng]} icon={iconChallenge}>
            <Popup className="custom-popup">
              <div className="text-slate-900 w-52 p-1">
                <div className="text-[9px] font-mono font-black text-purple-600 uppercase tracking-widest mb-1">
                  MASTER CHALLENGE · {ch.id}
                </div>
                <div className="font-extrabold text-sm text-slate-900 mb-1">{ch.title}</div>
                <div className="text-[10px] text-slate-500 mb-2">{ch.location} • Status: {ch.status}</div>
                <button
                  onClick={() => dispatch({
                    type: 'START_WORKFLOW',
                    payload: { action: 'INVITE_UNIVERSITY', challengeId: ch.id }
                  })}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors"
                >
                  Invite University/CSR Proposal
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* LAYER 6: ACTIVE SOLUTION PROJECTS */}
        {layers.projects && activeProjects.map((pj) => (
          <Marker key={pj.id} position={[pj.lat, pj.lng]} icon={iconProject}>
            <Popup className="custom-popup">
              <div className="text-slate-900 w-52 p-1">
                <div className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest mb-1">
                  PROJECT IN FLIGHT · {pj.id}
                </div>
                <div className="font-extrabold text-sm text-slate-900 mb-1">{pj.title}</div>
                <div className="text-[10px] text-slate-600 mb-2">Partner: {pj.partner}</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pj.completion}%` }}></div>
                </div>
                <div className="text-[9px] font-mono text-emerald-700 font-bold mb-2">{pj.completion}% Completed</div>
                <button
                  onClick={() => dispatch({
                    type: 'ADD_TOAST',
                    payload: {
                      title: 'Project Milestone Telemetry',
                      message: `Sensor telemetry confirmed 0 ppm impurities post-deployment.`,
                      type: 'success'
                    }
                  })}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors"
                >
                  Verify Deployment Metrics
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
