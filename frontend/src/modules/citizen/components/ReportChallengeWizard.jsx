import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../../context/AuthContext';
import { saveNewProblemLocally } from '../../../utils/mockStorage';

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

const STEP_LABELS = ['Problem', 'Location', 'Impact', 'Evidence', 'Action', 'Community', 'Privacy', 'Review'];

export default function ReportChallengeWizard({ onComplete }) {
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPID, setSubmittedPID] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    startDate: '',
    frequency: '',
    occurrenceTime: '',

    state: 'Jharkhand',
    district: user?.district || '',
    block: user?.block || '',
    panchayat: '',
    ward: '',
    village: '',
    locality: '',
    landmark: '',
    pin: '',
    lat: null,
    lng: null,
    locationConfidence: 'High',

    affectedGroups: '',
    affectedPopulation: '',
    impactAreas: '',
    impactDescription: '',
    severity: 'Medium',
    immediateDanger: false,

    reportedBefore: 'No',
    previousReportWhere: '',
    previousReportDetails: '',

    reportingForWhom: 'Self',
    priDetails: '',
    solutionType: '',
    suggestedSolution: '',
    existingAttempts: '',
    requiredExpertise: '',
    supportRequired: '',

    visibility: 'Public',
    showName: true,
    consent: false,
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
    if (step === 1) return form.title.trim().length > 2 && form.category && form.description.trim().length > 2;
    if (step === 2) return form.district; 
    if (step === 3) return form.severity;
    if (step === 7) return form.consent;
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
    rec.lang = 'hi-IN';
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

  // AI Analysis (Step 8)
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
    if (step === 8) runAIAnalysis();
  }, [step]);

  // Submit
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        isAnonymous: !form.showName,
        location: {
          type: 'Point',
          coordinates: [form.lng || 85.3, form.lat || 23.3]
        },
        aiCategory: aiResult?.aiCategory || form.category,
        aiPriority: aiResult?.aiPriority || form.severity,
        aiConfidence: aiResult?.aiConfidence || 0.7,
        aiSummary: aiResult?.aiSummary || '',
        aiRoutingDept: aiResult?.aiRoutingDept || '',
        duplicateOf: aiResult?.duplicateProblemId || null,
        affectedPopulationEstimate: parseInt(form.affectedPopulation) || 0,
      };

      try {
        const res = await fetch(`${API}/problems`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          setSubmittedPID(data.problemIdReadable || data._id);
          setStep(9);
          return;
        }
      } catch (err) {
        console.warn('Backend unavailable, saving problem locally:', err);
      }

      // Offline / Vercel fallback
      const localProb = saveNewProblemLocally(payload, user);
      setSubmittedPID(localProb.problemIdReadable);
      setStep(9);
    } catch (err) {
      console.error('Submission fallback error:', err);
      const localProb = saveNewProblemLocally(payload, user);
      setSubmittedPID(localProb.problemIdReadable);
      setStep(9);
    } finally {
      setSubmitting(false);
    }
  };

  const updateForm = (key, value) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      {step < 9 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 px-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1 w-1/8">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black border-2 transition-all ${
                  i + 1 < step ? 'bg-green-500 border-green-500 text-white' :
                  i + 1 === step ? 'bg-orange-500 border-orange-500 text-white' :
                  'bg-white border-blue-100 text-black'
                }`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`hidden sm:block text-[9px] font-bold uppercase tracking-wider text-center ${i + 1 === step ? 'text-orange-600' : 'text-black'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 7) * 100}%` }} />
          </div>
        </div>
      )}

      {/* STEP 1: Problem Details */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Problem Details</h3>
          
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Problem Title *</label>
            <input value={form.title} onChange={e => updateForm('title', e.target.value)}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none" placeholder="e.g. Contaminated water supply in Ward 12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Category *</label>
              <select value={form.category} onChange={e => updateForm('category', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Subcategory</label>
              <input value={form.subcategory} onChange={e => updateForm('subcategory', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="e.g. Pothole, Broken Pipe" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-black">Description *</label>
              <button onClick={startVoice}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${listening ? 'bg-orange-500 text-white border-orange-500 animate-pulse' : 'border-blue-100 text-black hover:border-orange-300'}`}>
                🎤 {listening ? 'Listening...' : 'Speak (हिंदी)'}
              </button>
            </div>
            <textarea value={form.description} onChange={e => updateForm('description', e.target.value)} rows={4}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none resize-none" placeholder="Detailed description of the issue..." />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => updateForm('startDate', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Frequency</label>
              <select value={form.frequency} onChange={e => updateForm('frequency', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                <option value="">Select</option>
                <option>Daily</option><option>Weekly</option><option>Occasional</option><option>Constant</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Time of Occurrence</label>
              <input type="time" value={form.occurrenceTime} onChange={e => updateForm('occurrenceTime', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Location */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-black">Location Details</h3>

          <button onClick={getGPS} disabled={gpsLoading}
            className="w-full flex items-center justify-center gap-2 bg-orange-50 border-2 border-orange-200 text-orange-700 font-bold py-3 rounded-xl hover:bg-orange-100 transition-all">
            {gpsLoading ? '📡 Getting location...' : '📍 Use My Current GPS Location'}
          </button>

          <div className="h-48 rounded-xl overflow-hidden border-2 border-blue-100">
            <MapContainer center={mapPos || [23.3441, 85.3096]} zoom={mapPos ? 15 : 8} style={{ height: '100%', width: '100%' }} key={mapPos ? mapPos.join(',') : 'default'}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
              <MapPicker position={mapPos} setPosition={setMapPos} />
            </MapContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">State</label>
              <input value={form.state} readOnly className="w-full border-2 border-blue-100 rounded-xl px-3 py-2 text-sm bg-white text-black" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">District *</label>
              <select value={form.district} onChange={e => updateForm('district', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                <option value="">Select District</option>
                {JHARKHAND_DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Block</label>
              <input value={form.block} onChange={e => updateForm('block', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Panchayat</label>
              <input value={form.panchayat} onChange={e => updateForm('panchayat', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Ward</label>
              <input value={form.ward} onChange={e => updateForm('ward', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Village</label>
              <input value={form.village} onChange={e => updateForm('village', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Locality</label>
              <input value={form.locality} onChange={e => updateForm('locality', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">Landmark</label>
              <input value={form.landmark} onChange={e => updateForm('landmark', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1">PIN</label>
              <input value={form.pin} onChange={e => updateForm('pin', e.target.value)} className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Impact */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Impact & Severity</h3>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Affected Population</label>
            <div className="flex gap-2 flex-wrap">
              {['<50','50-200','200-500','500-1000','1000-5000','5000+'].map(r => (
                <button key={r} onClick={() => updateForm('affectedPopulation', r)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.affectedPopulation === r ? 'bg-orange-500 border-orange-500 text-white' : 'border-blue-100 text-black hover:border-orange-300'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Severity</label>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button key={s} onClick={() => updateForm('severity', s)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.severity === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-blue-100 text-black hover:border-orange-300'}`}>
                  {s === 'Critical' ? '🔴' : s === 'High' ? '🟠' : s === 'Medium' ? '🟡' : '🟢'} {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Affected Groups</label>
              <input value={form.affectedGroups} onChange={e => updateForm('affectedGroups', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none" placeholder="e.g. Children, Farmers" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Impact Areas</label>
              <input value={form.impactAreas} onChange={e => updateForm('impactAreas', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none" placeholder="e.g. Health, Economy" />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Impact Description</label>
            <textarea value={form.impactDescription} onChange={e => updateForm('impactDescription', e.target.value)} rows={3}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none resize-none" placeholder="How is this affecting the community?" />
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-all">
            <input type="checkbox" checked={form.immediateDanger} onChange={e => updateForm('immediateDanger', e.target.checked)} className="w-5 h-5 accent-orange-600" />
            <span className="text-sm font-bold text-orange-700">Flag as Immediate Danger (Life-threatening / Emergency)</span>
          </label>
        </div>
      )}

      {/* STEP 4: Evidence */}
      {step === 4 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Upload Evidence</h3>
          
          <div onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-orange-300 bg-orange-50 rounded-2xl p-8 text-center cursor-pointer hover:bg-orange-100 transition-all">
            <div className="text-4xl mb-2">📷</div>
            <p className="font-bold text-black">Click to upload photos or videos</p>
            <p className="text-black text-sm mt-1">Supports JPG, PNG, MP4</p>
            <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFiles} />
          </div>

          {imageAnalyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-700 font-bold text-sm">🤖 AI analyzing evidence...</span>
            </div>
          )}

          {imageAnalysis && !imageAnalyzing && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
              <span className="text-green-600 font-black text-sm">✅ AI Image Analysis Complete</span>
              <p className="text-black text-sm"><strong>Detected:</strong> {imageAnalysis.problemDescription}</p>
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-3 py-2">
                  <span className="text-lg">{f.type.startsWith('image/') ? '🖼️' : '🎥'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-xs font-bold truncate">{f.name}</p>
                  </div>
                  <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-orange-400 font-bold">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 5: Previous Action */}
      {step === 5 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Previous Action</h3>
          
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Have you reported this before?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="reported" checked={form.reportedBefore === 'Yes'} onChange={() => updateForm('reportedBefore', 'Yes')} className="accent-orange-500" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="reported" checked={form.reportedBefore === 'No'} onChange={() => updateForm('reportedBefore', 'No')} className="accent-orange-500" /> No
              </label>
            </div>
          </div>

          {form.reportedBefore === 'Yes' && (
            <>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Where was it reported?</label>
                <input value={form.previousReportWhere} onChange={e => updateForm('previousReportWhere', e.target.value)}
                  className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none" placeholder="e.g. Local Panchayat, Ward Member" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Details / Outcome</label>
                <textarea value={form.previousReportDetails} onChange={e => updateForm('previousReportDetails', e.target.value)} rows={3}
                  className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none resize-none" placeholder="What was the response?" />
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 6: Community / Organisation */}
      {step === 6 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Community & Solutions</h3>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Reporting on behalf of</label>
            <select value={form.reportingForWhom} onChange={e => updateForm('reportingForWhom', e.target.value)}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
              <option>Self</option>
              <option>Community Group</option>
              <option>NGO / Organisation</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Solution Type</label>
              <input value={form.solutionType} onChange={e => updateForm('solutionType', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="e.g. Infrastructure, Policy" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">PRI Details (if applicable)</label>
              <input value={form.priDetails} onChange={e => updateForm('priDetails', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="Panchayati Raj Institution info" />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Suggested Solution (Optional)</label>
            <textarea value={form.suggestedSolution} onChange={e => updateForm('suggestedSolution', e.target.value)} rows={2}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-4 py-2 text-sm outline-none resize-none" placeholder="Do you have a proposed fix?" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Requiorange Expertise</label>
              <input value={form.requiredExpertise} onChange={e => updateForm('requiredExpertise', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="e.g. Civil Engineer, Doctor" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Support Requiorange</label>
              <input value={form.supportRequired} onChange={e => updateForm('supportRequired', e.target.value)}
                className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none" placeholder="e.g. Funds, Volunteers" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Contact & Privacy */}
      {step === 7 && (
        <div className="space-y-5">
          <h3 className="text-xl font-black text-black">Contact & Privacy</h3>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black block mb-1.5">Visibility</label>
            <select value={form.visibility} onChange={e => updateForm('visibility', e.target.value)}
              className="w-full border-2 border-blue-100 focus:border-orange-400 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
              <option>Public</option>
              <option>Govt + Partners Only</option>
              <option>Govt Only</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" checked={form.showName} onChange={e => updateForm('showName', e.target.checked)} className="w-5 h-5 accent-orange-500" />
            <span className="text-sm font-medium text-black">Display my name publicly as the reporter</span>
          </div>

          <div className="p-4 bg-white border border-blue-100 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={e => updateForm('consent', e.target.checked)} className="w-5 h-5 mt-0.5 accent-orange-500" />
              <span className="text-sm text-black leading-relaxed">
                <strong>Consent:</strong> I confirm that the information provided is accurate to the best of my knowledge and can be used by the government to resolve the issue. *
              </span>
            </label>
          </div>
        </div>
      )}

      {/* STEP 8: Review & Submit */}
      {step === 8 && (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-black mb-1">Review & Submit</h3>

          {aiLoading ? (
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 border-3 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }} />
              <p className="text-white font-bold">AI Analyzing Report...</p>
            </div>
          ) : aiResult ? (
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-xs">🤖</span>
                <span className="font-black text-sm">AI Summary</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">{aiResult.aiSummary}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded-full">{aiResult.aiCategory}</span>
                <span className="bg-orange-500/20 text-orange-300 text-xs font-bold px-2 py-1 rounded-full">{aiResult.aiPriority} Priority</span>
                <span className="bg-blue-200/20 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">{aiResult.aiRoutingDept}</span>
              </div>
            </div>
          ) : null}

          <div className="bg-white border border-blue-100 rounded-xl p-4 text-sm space-y-2">
            <h4 className="font-black text-black mb-3 border-b pb-2">Report Summary</h4>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="font-bold text-black">Title:</span> {form.title}</p>
              <p><span className="font-bold text-black">Category:</span> {form.category}</p>
              <p><span className="font-bold text-black">District:</span> {form.district}</p>
              <p><span className="font-bold text-black">Severity:</span> {form.severity}</p>
              <p><span className="font-bold text-black">Visibility:</span> {form.visibility}</p>
              <p><span className="font-bold text-black">Evidence:</span> {files.length} file(s)</p>
            </div>
            <p className="mt-2"><span className="font-bold text-black">Description:</span> {form.description}</p>
          </div>
        </div>
      )}

      {/* STEP 9: Success */}
      {step === 9 && (
        <div className="text-center py-6 space-y-5">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-400/30">
            <span className="text-4xl">✅</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-black mb-2">Problem Reported!</h3>
            <p className="text-black text-sm">Your report has been successfully submitted to NIRVAHA.</p>
          </div>
          <div className="bg-blue-600 rounded-2xl p-5 text-white inline-block mx-auto">
            <p className="text-black text-xs font-bold uppercase tracking-widest mb-1">Your Problem ID</p>
            <p className="text-2xl font-black text-orange-400 font-mono">{submittedPID}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => onComplete?.('track', submittedPID)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all">
              Track Problem
            </button>
            <button onClick={() => onComplete?.('dashboard')}
              className="flex-1 border-2 border-blue-100 hover:border-orange-300 text-black font-bold py-3 rounded-xl transition-all">
              Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      {step < 9 && (
        <div className="flex gap-3 mt-8 pt-5 border-t border-blue-100">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 border-2 border-blue-100 hover:border-orange-300 text-black font-bold py-3 rounded-xl transition-all">
              ← Back
            </button>
          )}
          {step < 8 && (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Continue →
            </button>
          )}
          {step === 8 && (
            <button onClick={handleSubmit} disabled={submitting || aiLoading}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-green-500/20">
              {submitting ? 'Submitting...' : '🚀 Submit to NIRVAHA'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
