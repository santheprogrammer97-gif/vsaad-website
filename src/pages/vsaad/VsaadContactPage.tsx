import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
} from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadContactPage: React.FC = () => {
  const { siteConfig, submitEnquiry } = useVsaad();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productInterest, setProductInterest] = useState('Granite Slabs');
  const [projectLocation, setProjectLocation] = useState('Chennai');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot spam protection

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silently drop spam if honeypot is filled
    if (honeypot.trim()) {
      setStatus('success');
      setStatusMsg('Your message has been received.');
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setStatus('error');
      setStatusMsg('Please provide your name and phone number so our showroom specialist can contact you.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    const res = await submitEnquiry({
      type: 'enquiry',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      productInterest,
      projectLocation,
      message: message.trim(),
    });

    setLoading(false);
    if (res.success) {
      setStatus('success');
      setStatusMsg(res.message);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('error');
      setStatusMsg(res.message);
    }
  };

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            Visit the Showroom & Consult
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2">
            Inspect full-scale gangsaw slabs in Chennai or discuss project measurements, edge profiling, and delivery schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Showroom Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#0F0F14] border border-[#22222E] rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-vsaad-purple-light uppercase">
                  Flagship Location
                </span>
                <h2 className="text-2xl font-display text-vsaad-ivory mt-1">
                  Chennai Experience Showroom
                </h2>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-vsaad-purple shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-vsaad-ivory block font-medium">Address:</strong>
                    <p className="text-vsaad-ivory-muted leading-relaxed mt-0.5">
                      {siteConfig?.contact.address || '123, Anna Salai'}<br />
                      {siteConfig?.contact.city || 'Chennai'} – {siteConfig?.contact.pincode || '600002'}, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-vsaad-purple shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-vsaad-ivory block font-medium">Telephone & WhatsApp:</strong>
                    <a
                      href={`tel:${siteConfig?.contact.phone || '+919876543210'}`}
                      className="text-vsaad-ivory-muted hover:text-vsaad-purple-light transition-colors block mt-0.5"
                    >
                      {siteConfig?.contact.phone || '+91 98765 43210'}
                    </a>
                    {siteConfig?.contact.altPhone && (
                      <a
                        href={`tel:${siteConfig.contact.altPhone}`}
                        className="text-vsaad-ivory-muted hover:text-vsaad-purple-light transition-colors block"
                      >
                        {siteConfig.contact.altPhone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-vsaad-purple shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-vsaad-ivory block font-medium">Email Desk:</strong>
                    <a
                      href={`mailto:${siteConfig?.contact.email || 'info@vsaad.com'}`}
                      className="text-vsaad-ivory-muted hover:text-vsaad-purple-light transition-colors block mt-0.5"
                    >
                      {siteConfig?.contact.email || 'info@vsaad.com'}
                    </a>
                    <a
                      href={`mailto:${siteConfig?.contact.salesEmail || 'sales@vsaad.com'}`}
                      className="text-vsaad-ivory-muted hover:text-vsaad-purple-light transition-colors block"
                    >
                      {siteConfig?.contact.salesEmail || 'sales@vsaad.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-vsaad-purple shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-vsaad-ivory block font-medium">Inspection Hours:</strong>
                    <p className="text-vsaad-ivory-muted mt-0.5">
                      {siteConfig?.contact.workingHours || 'Mon – Sat: 09:30 AM – 08:00 PM'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1C26]">
                <a
                  href={`https://wa.me/${(siteConfig?.contact.phone || '919876543210').replace(/[^0-9]/g, '')}?text=Hello%20VSAAD,%20I%20would%20like%20to%20visit%20your%20Chennai%20showroom.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xs bg-[#171720] hover:bg-[#1E1E2A] border border-[#2A2A38] hover:border-vsaad-purple text-vsaad-ivory text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-green-400" />
                  <span>Connect with Showroom via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0F0F14] border border-[#22222E] rounded-sm p-6 sm:p-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-vsaad-purple-light uppercase">
                Direct Submission
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-vsaad-ivory mt-1">
                Send an Enquiry
              </h2>
              <p className="text-xs text-vsaad-ivory-muted font-sans mt-1">
                Fill in your details below and an architectural surface specialist will respond within 24 hours.
              </p>
            </div>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto" />
                <h3 className="text-2xl font-display text-white">Enquiry Received</h3>
                <p className="text-xs text-vsaad-ivory-muted max-w-sm mx-auto font-sans leading-relaxed">
                  {statusMsg}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 bg-vsaad-purple text-white text-xs uppercase tracking-wider rounded-xs"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5 font-sans text-xs">
                {status === 'error' && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Honeypot hidden input for spam protection */}
                <input
                  type="text"
                  name="user_website_trap"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Ramesh Krishnan"
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="client@gmail.com"
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                      Material / Category Interest
                    </label>
                    <select
                      value={productInterest}
                      onChange={e => setProductInterest(e.target.value)}
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none"
                    >
                      <option value="Granite Slabs">Granite Slabs (Black Galaxy, Absolute Black, etc.)</option>
                      <option value="Italian Marble">Italian & Imported Marble (Statuario, Calacatta)</option>
                      <option value="Architectural Tiles">Large Format Architectural Tiles</option>
                      <option value="Kitchen Countertops">Kitchen & Waterfall Island Countertops</option>
                      <option value="Staircase Materials">Chamfered Steps & Risers</option>
                      <option value="Exterior Cladding">Thermal Flamed Exterior Cladding</option>
                      <option value="General Inquiry">General Architectural Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                    Project Site / City Location
                  </label>
                  <input
                    type="text"
                    value={projectLocation}
                    onChange={e => setProjectLocation(e.target.value)}
                    placeholder="e.g. Chennai, Bangalore, Madurai, Coimbatore"
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your project, approximate square footage, timeline, and whether you require on-site measurement in Tamil Nadu..."
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Send Enquiry to Showroom'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
