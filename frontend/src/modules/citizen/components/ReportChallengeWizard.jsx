import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../../context/AuthContext';

const API = 'http://localhost:5000/api';

const CATEGORIES = ['Water','Roads','Health','Education','Sanitation','Electricity','Environment','Agriculture','Governance','Safety','Other'];
const SEVERITIES = ['Low','Medium','High','Critical'];
const JHARKHAND_DISTRICTS = ['Bokaro','Chatra','Deoghar','Dhanbad','Dumka','East Singhbhum','Garhwa','Giridih','Godda','Gumla','Hazaribagh','Jamtara','Khunti','Koderma','Latehar','Lohardaga','Pakur','Palamu','Ramgarh','Ranchi','Sahebganj','Seraikela-Kharsawan','Simdega','West Singhbhum'];

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map click handler
function MapPicker({ position, setPosition }) {
  useMapEvents({
    click(e) { setPosition([e.latlng.lat, e.latlng.lng]); }
  });
  return position ? <Marker position={position} /> : null;
}

// Convert file to base64
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = reject;
});

const STEP_LABELS = ['Problem','Impact','Location','Evidence','AI Review','Submit'];

export default function ReportChallengeWizard({ onComplete }) {
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPID, setSubmittedPID] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    severity: 'Medium',
    affectedPopulation: '',
    duration: '',
    priorAttempts: '',
    district: user?.district || '',
    block: user?.block || '',
    panchayat: '',
    village: '',
    lat: null,
    lng: null,
    isAnonymous: false,
    citizenType: user?.role || 'individual',
  });
  const [mapPos, setMapPos] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Evidence
  const [files, setFiles] = useState([]);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [imageAnalyzing, setImageAnalyzing] = useState(false);
  const fileRef = useRef(null);

  // AI analysis
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Voice
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (mapPos) {
      setForm(f => ({ ...f, lat: mapPos[0], lng: mapPos[1] }));
    }
  }, [mapPos]);

  // Step validation
  const canNext = () => {
    if (step === 1) return form.title.trim().length > 5 && form.category;
    if (step === 2) return true;
    if (step === 3) return form.district || form.lat;
    return true;
  };

  // GPS
  const getGPS = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setMapPos([lat, lng]);
        setForm(f => ({ ...f, lat, lng }));
        setGpsLoading(false);
      },
      err => { console.error(err); setGpsLoading(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Voice input
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Voice input not supported in this browser');
    const rec = new SpeechRecognition();
    rec.lang = 'hi-IN'; // Hindi (Jharkhand)
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onresult = e => {
      const transcript = e.results[0][0].transcript;
      setForm(f => ({ ...f, description: f.description + ' ' + transcript }));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  };

  // File upload + image analysis
  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    setFiles(prev => [...prev, ...selected]);

    // Analyze first image with Gemini
    const imageFile = selected.find(f => f.type.startsWith('image/'));
    if (imageFile) {
      setImageAnalyzing(true);
      try {
        const base64 = await fileToBase64(imageFile);
        const res = await fetch(`${API}/ai/image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64, mimeType: imageFile.type })
        });
        const data = await res.json();
        setImageAnalysis(data);
        // Auto-fill category from image analysis
        if (data.suggestedCategory && !form.category) {
          setForm(f => ({ ...f, category: data.suggestedCategory }));
        }
        if (data.problemDescription && !form.description) {
          setForm(f => ({ ...f, description: data.problemDescription }));
        }
      } catch (err) {
        console.error('Image analysis failed:', err);
      } finally {
        setImageAnalyzing(false);
      }
    }
  };

  // AI Analysis (Step 5)
  const runAIAnalysis = async () => {
    setAiLoading(true);
    try {
      const res = await fetch(`${API}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          district: form.district
        })
      });
      const data = await res.json();
      setAiResult(data);
    } catch {
      setAiResult({
        aiCategory: form.category,
        aiPriority: form.severity,
        aiConfidence: 0.7,
        aiSummary: form.description.slice(0, 150),
        aiRoutingDept: 'District Administration',
        aiSuggestedActions: ['Contact local authority'],
        duplicateDetected: false,
        duplicateProblemId: null,
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (step === 5) runAIAnalysis();
  }, [step]);

  // Submit
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          subcategory: aiResult?.aiSubcategory || '',
          affectedPopulationEstimate: parseInt(form.affectedPopulation) || 0,
          durationOrFrequency: form.duration,
          priorAttempts: form.priorAttempts,
          district: form.district,
          block: form.block,
          panchayat: form.panchayat,
          village: form.village,
          location: {
            type: 'Point',
            coordinates: [form.lng || 85.3, form.lat || 23.3]
          },
          isAnonymous: form.isAnonymous,
          citizenType: form.citizenType,
          aiCategory: aiResult?.aiCategory || form.category,
          aiPriority: aiResult?.aiPriority || form.severity,
          aiConfidence: aiResult?.aiConfidence || 0.7,
          aiSummary: aiResult?.aiSummary || '',
          aiRoutingDept: aiResult?.aiRoutingDept || '',
          duplicateOf: aiResult?.duplicateProblemId || null,
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSubmittedPID(data.problemIdReadable || data._id);
        setStep(6);
      } else {
        alert('Submission failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      {step < 6 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                  i + 1 < step ? 'bg-emerald-500 border-emerald-500 text-white' :
                  i + 1 === step ? 'bg-orange-500 border-orange-500 text-white' :
                  'bg-white border-slate-200 text-slate-400'
                }`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${i + 1 === step ? 'text-orange-600' : 'text-slate-400'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 5) * 100}%` }} />
          </div>
        </div>
      )}

      {/* STEP 1 — Problem Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Describe the Problem</h3>
            <p className="text-slate-500 text-sm">Tell us what's happening in your community</p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">Problem Title *</label>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
              placeholder="e.g. Contaminated water supply in Ward 12"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">Category *</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${form.category === c ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-200 text-slate-600 hover:border-orange-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">Description *</label>
              <button onClick={startVoice}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${listening ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'border-slate-200 text-slate-500 hover:border-orange-300'}`}>
                🎤 {listening ? 'Listening...' : 'Speak (हिंदी)'}
              </button>
            </div>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none resize-none transition-all"
              placeholder="Describe the problem in detail. When did it start? How does it affect people?"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isAnonymous} onChange={e => setForm(f => ({ ...f, isAnonymous: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
            <span className="text-sm font-medium text-slate-600">Submit anonymously (your name will be hidden)</span>
          </label>
        </div>
      )}

      {/* STEP 2 — Impact */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Impact Assessment</h3>
            <p className="text-slate-500 text-sm">Help us understand the scale of the problem</p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">Estimated Affected Population</label>
            <div className="flex gap-2 flex-wrap">
              {['<50','50-200','200-500','500-1000','1000-5000','5000+'].map(r => (
                <button key={r} onClick={() => setForm(f => ({ ...f, affectedPopulation: r.replace(/[<+]/g,'').split('-')[0] }))}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.affectedPopulation && r.includes(form.affectedPopulation) ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-200 text-slate-600 hover:border-orange-300'}`}>
                  {r} people
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">Severity</label>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, severity: s }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.severity === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-200 text-slate-600 hover:border-orange-300'}`}>
                  {s === 'Critical' ? '🔴' : s === 'High' ? '🟠' : s === 'Medium' ? '🟡' : '🟢'} {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">How long has this been happening?</label>
            <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all bg-white">
              <option value="">Select duration</option>
              {['Less than a week','1-4 weeks','1-3 months','3-6 months','6 months - 1 year','More than 1 year'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1.5">Prior attempts to resolve</label>
            <textarea value={form.priorAttempts} onChange={e => setForm(f => ({ ...f, priorAttempts: e.target.value }))}
              rows={2} className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none resize-none transition-all"
              placeholder="Have you complained to anyone before? What happened?" />
          </div>
        </div>
      )}

      {/* STEP 3 — Location */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Problem Location</h3>
            <p className="text-slate-500 text-sm">Pin the exact location on the map or enter details</p>
          </div>

          <button onClick={getGPS} disabled={gpsLoading}
            className="w-full flex items-center justify-center gap-2 bg-orange-50 border-2 border-orange-200 text-orange-700 font-bold py-3 rounded-xl hover:bg-orange-100 transition-all disabled:opacity-60">
            {gpsLoading ? '📡 Getting location...' : '📍 Use My Current GPS Location'}
          </button>

          {/* Leaflet Map */}
          <div className="h-52 rounded-xl overflow-hidden border-2 border-slate-200">
            <MapContainer
              center={mapPos || [23.3441, 85.3096]}
              zoom={mapPos ? 15 : 8}
              style={{ height: '100%', width: '100%' }}
              key={mapPos ? mapPos.join(',') : 'default'}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
              <MapPicker position={mapPos} setPosition={setMapPos} />
            </MapContainer>
          </div>
          {mapPos && <p className="text-xs text-emerald-600 font-bold text-center">📍 Pinned: {mapPos[0].toFixed(5)}, {mapPos[1].toFixed(5)}</p>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">District *</label>
              <select value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                <option value="">Select District</option>
                {JHARKHAND_DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">Block / Ward</label>
              <input value={form.block} onChange={e => setForm(f => ({ ...f, block: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="Block / Ward" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">Panchayat</label>
              <input value={form.panchayat} onChange={e => setForm(f => ({ ...f, panchayat: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="Panchayat name" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">Village / Area</label>
              <input value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="Village / Area" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 — Evidence */}
      {step === 4 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Add Evidence</h3>
            <p className="text-slate-500 text-sm">Photos and videos strengthen your report. AI will analyze them instantly.</p>
          </div>

          {/* Upload area */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-orange-300 bg-orange-50 rounded-2xl p-8 text-center cursor-pointer hover:bg-orange-100 transition-all"
          >
            <div className="text-4xl mb-2">📷</div>
            <p className="font-bold text-slate-700">Click to upload photos or videos</p>
            <p className="text-slate-500 text-sm mt-1">JPG, PNG, MP4, WebM — up to 10MB each</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </div>

          {/* AI Image Analysis */}
          {imageAnalyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-700 font-bold text-sm">🤖 Gemini AI is analyzing your image...</span>
            </div>
          )}

          {imageAnalysis && !imageAnalyzing && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-black text-sm">✅ AI Image Analysis Complete</span>
              </div>
              <p className="text-slate-700 text-sm"><strong>Problem detected:</strong> {imageAnalysis.problemDescription}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">Category: {imageAnalysis.suggestedCategory}</span>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">Severity: {imageAnalysis.severity}</span>
                {imageAnalysis.tags?.map(t => <span key={t} className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-full">{t}</span>)}
              </div>
            </div>
          )}

          {/* Uploaded files */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <span className="text-lg">{f.type.startsWith('image/') ? '🖼️' : '🎥'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-xs font-bold truncate">{f.name}</p>
                    <p className="text-slate-400 text-xs">{(f.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <span className="text-emerald-600 text-xs font-bold">✓ Ready</span>
                  <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-slate-300 hover:text-red-400 transition-all">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 5 — AI Review */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">AI Intelligence Review</h3>
            <p className="text-slate-500 text-sm">Gemini AI is classifying, prioritizing, and checking for duplicates</p>
          </div>

          {aiLoading && (
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 border-3 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }} />
              <p className="text-white font-bold">AI Problem Intelligence Module</p>
              <div className="mt-3 space-y-1.5">
                {['Problem Classification...','Priority Assessment...','Duplicate Detection...','Intelligent Routing...'].map((s, i) => (
                  <p key={s} className="text-slate-400 text-xs flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: `${i * 200}ms` }} />
                    {s}
                  </p>
                ))}
              </div>
            </div>
          )}

          {aiResult && !aiLoading && (
            <div className="space-y-3">
              {/* AI Summary Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-xs">🤖</span>
                  <span className="font-black text-sm">AI Understanding Summary</span>
                  <span className="ml-auto text-xs text-emerald-400 font-bold">Confidence: {Math.round((aiResult.aiConfidence || 0.85) * 100)}%</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{aiResult.aiSummary}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded-full">📂 {aiResult.aiCategory}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    aiResult.aiPriority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                    aiResult.aiPriority === 'High' ? 'bg-orange-500/20 text-orange-300' :
                    aiResult.aiPriority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>🎯 {aiResult.aiPriority} Priority</span>
                  <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded-full">🏢 {aiResult.aiRoutingDept}</span>
                </div>
              </div>

              {/* Suggested Actions */}
              {aiResult.aiSuggestedActions?.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="font-bold text-amber-800 text-sm mb-2">💡 Suggested Resolution Actions</p>
                  <ul className="space-y-1">
                    {aiResult.aiSuggestedActions.map((a, i) => (
                      <li key={i} className="text-amber-700 text-sm flex items-start gap-2"><span className="text-amber-400 mt-0.5">•</span>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Duplicate Detection */}
              {aiResult.duplicateDetected && aiResult.duplicateProblemId ? (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                  <p className="font-black text-yellow-800 text-sm mb-2">⚠️ Similar Problem Detected</p>
                  <p className="text-yellow-700 text-sm">Problem <code className="bg-yellow-100 px-1.5 py-0.5 rounded font-mono">{aiResult.duplicateProblemId}</code> is {Math.round((aiResult.duplicateSimilarityScore || 0.85) * 100)}% similar to yours.</p>
                  <p className="text-yellow-600 text-xs mt-1">{aiResult.duplicateReason}</p>
                  <p className="text-yellow-700 text-sm mt-2 font-medium">Submitting will add your validation and increase its priority. 🙌</p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-emerald-600">✅</span>
                  <span className="text-emerald-700 font-bold text-sm">No duplicate found — this is a new problem report</span>
                </div>
              )}

              {/* Problem summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-1">
                <p><span className="font-bold text-slate-600">Title:</span> {form.title}</p>
                <p><span className="font-bold text-slate-600">Location:</span> {[form.district, form.block, form.village].filter(Boolean).join(', ') || (form.lat ? `${form.lat.toFixed(4)}, ${form.lng.toFixed(4)}` : 'Not specified')}</p>
                <p><span className="font-bold text-slate-600">Evidence:</span> {files.length} file{files.length !== 1 ? 's' : ''} attached</p>
                <p><span className="font-bold text-slate-600">Submitting as:</span> {form.isAnonymous ? 'Anonymous' : (user?.name || 'Citizen')}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 6 — Success */}
      {step === 6 && (
        <div className="text-center py-6 space-y-5">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-400/30">
            <span className="text-4xl">✅</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Problem Reported!</h3>
            <p className="text-slate-500 text-sm">Your report has been submitted to NIRVAHA and routed to the relevant government department.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white inline-block mx-auto">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Your Problem ID</p>
            <p className="text-2xl font-black text-orange-400 font-mono">{submittedPID}</p>
            <p className="text-slate-400 text-xs mt-2">Save this ID to track your problem</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
            <p className="font-bold text-amber-800 text-sm mb-1">What happens next?</p>
            <ul className="text-amber-700 text-xs space-y-1">
              <li>• Government will verify within 48 hours</li>
              <li>• University teams may propose solutions</li>
              <li>• You earn <strong>+10 Karma Points</strong> for this report</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onComplete?.('track', submittedPID)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all">
              Track My Problem →
            </button>
            <button onClick={() => onComplete?.('dashboard')}
              className="flex-1 border-2 border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3 rounded-xl transition-all">
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < 6 && (
        <div className="flex gap-3 mt-8 pt-5 border-t border-slate-100">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 border-2 border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3 rounded-xl transition-all">
              ← Back
            </button>
          )}
          {step < 5 && (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Continue →
            </button>
          )}
          {step === 5 && (
            <button onClick={handleSubmit} disabled={submitting || aiLoading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              {submitting ? 'Submitting...' : '🚀 Submit to NIRVAHA'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
