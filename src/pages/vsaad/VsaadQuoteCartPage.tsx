import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Send,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
} from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadQuoteCartPage: React.FC = () => {
  const { quoteCart, updateQuoteQuantity, removeFromQuoteCart, submitQuoteRequest, siteConfig } = useVsaad();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('Chennai');
  const [projectType, setProjectType] = useState('Residential Villa');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalSqFt = quoteCart.reduce((sum, item) => sum + item.quantitySqFt, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number for quotation dispatch.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const formattedMessage = `[Project Type: ${projectType}] [City: ${projectLocation}]\n${message || 'Quotation requested for specified gangsaw slab specifications.'}`;

    const res = await submitQuoteRequest({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      projectLocation,
      message: formattedMessage,
    });

    setLoading(false);
    if (res.success) {
      setSubmissionSuccess(true);
    } else {
      setErrorMessage(res.message);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center bg-[#0F0F14] border border-[#22222E] rounded-sm p-8 sm:p-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-vsaad-purple/20 border border-vsaad-purple flex items-center justify-center mx-auto text-vsaad-purple-light">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
            Quotation Dispatch Confirmed
          </span>

          <h1 className="text-3xl font-display text-vsaad-ivory">
            Quotation Request Lodged
          </h1>

          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans leading-relaxed">
            Thank you, <strong className="text-vsaad-ivory">{name}</strong>. Your requested gangsaw specifications ({totalSqFt > 0 ? `${totalSqFt} sq.ft total` : 'custom requirement'}) have been received by our Anna Salai showroom team.
          </p>

          <p className="text-xs text-vsaad-ivory-dark font-sans">
            Our stone estimator will review bundle availability and reach out to you via WhatsApp / Call at <strong className="text-vsaad-ivory">{phone}</strong> within 2 business hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-2.5 bg-[#171720] border border-[#2A2A38] hover:border-vsaad-purple text-vsaad-ivory text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              Explore More Slabs
            </Link>
            <a
              href={`https://wa.me/${(siteConfig?.contact.phone || '919876543210').replace(/[^0-9]/g, '')}?text=Hello%20VSAAD,%20I%20just%20submitted%20a%20quotation%20request%20under%20name%20${encodeURIComponent(name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Bespoke Stone Procurement
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            Quotation Request Cart
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted max-w-xl font-sans mt-2">
            Review your selected stone materials, configure required square footage, and receive a formal estimate from our master masonry team.
          </p>
        </div>

        {quoteCart.length === 0 ? (
          <div className="py-24 text-center bg-[#0F0F14] border border-[#22222E] rounded-sm p-8 space-y-4">
            <ShoppingBag className="w-12 h-12 text-vsaad-ivory-dark mx-auto" />
            <h2 className="text-xl font-display text-vsaad-ivory">Your Quote Cart is Empty</h2>
            <p className="text-xs text-vsaad-ivory-muted max-w-md mx-auto font-sans leading-relaxed">
              Explore our granite, marble, and architectural tile catalogue to add materials to your project estimate list.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-[0.18em] rounded-xs transition-colors"
            >
              <span>Browse Natural Stone Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs flex items-center justify-between text-xs font-sans text-vsaad-ivory-dark">
                <span>Selected Stones ({quoteCart.length})</span>
                <span>Cumulative: {totalSqFt} sq.ft</span>
              </div>

              {quoteCart.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}`}
                  className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-20 h-16 object-cover rounded-xs border border-[#2A2A38] bg-black shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-vsaad-purple-light uppercase">
                        {item.product.sku}
                      </span>
                      <h3 className="text-base font-display text-vsaad-ivory">
                        {item.product.name}
                      </h3>
                      <p className="text-xs font-sans text-vsaad-ivory-dark mt-0.5">
                        Finish: <span className="text-vsaad-ivory">{item.selectedFinish}</span> • Calibrated: <span className="text-vsaad-ivory">{item.selectedThickness}</span>
                      </p>
                      <p className="text-xs font-mono text-vsaad-ivory-muted mt-1">
                        Indicative: {item.product.priceDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-vsaad-ivory-dark font-sans">
                        Sq.Ft:
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantitySqFt}
                        onChange={e => updateQuoteQuantity(item.product.id, Number(e.target.value))}
                        className="w-20 bg-[#171720] border border-[#2A2A38] rounded-xs px-2.5 py-1 text-xs font-mono text-vsaad-ivory text-right focus:border-vsaad-purple focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromQuoteCart(item.product.id)}
                      className="p-2 text-vsaad-ivory-dark hover:text-red-400 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Customer & Project Details Form (5 cols) */}
            <div className="lg:col-span-5 bg-[#0F0F14] border border-[#22222E] rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
                  Quotation Recipient
                </span>
                <h2 className="text-2xl font-display font-light text-vsaad-ivory mt-1">
                  Project Details
                </h2>
                <p className="text-xs text-vsaad-ivory-muted font-sans mt-1">
                  We prepare formal estimates including edge profiles, wastage factor (5-8%), and delivery logistics.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Client / Architect Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Anand Sundaram"
                    className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="client@gmail.com"
                      className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Project City / Site
                    </label>
                    <input
                      type="text"
                      value={projectLocation}
                      onChange={e => setProjectLocation(e.target.value)}
                      placeholder="e.g. Chennai, Madurai, Coimbatore"
                      className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none"
                    >
                      <option value="Residential Villa">Residential Villa</option>
                      <option value="Luxury Apartment">Luxury Apartment</option>
                      <option value="Commercial Complex">Commercial Complex</option>
                      <option value="Kitchen Renovation">Kitchen Renovation</option>
                      <option value="Facade / Exterior">Facade / Exterior</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Site Notes & Edge Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide details regarding slab thickness preferences, bullnose edges, or on-site laser templating requests..."
                    className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Estimate Request...' : 'Submit Official Quotation Request'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
