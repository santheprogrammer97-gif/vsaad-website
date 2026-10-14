import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { VsaadProduct } from '../../types/vsaadTypes';
import { useVsaad } from '../../context/VsaadContext';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: VsaadProduct | null;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { submitEnquiry } = useVsaad();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('Chennai');
  const [estimatedSqFt, setEstimatedSqFt] = useState('500 sq.ft');
  const [selectedFinish, setSelectedFinish] = useState(product?.defaultFinish || 'Polished');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatus('error');
      setStatusMsg('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    const res = await submitEnquiry({
      type: 'quote',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      projectLocation,
      estimatedSqFt,
      productInterest: `${product.name} (${selectedFinish})`,
      message: message.trim() || `Quote requested for ${product.name} [SKU: ${product.sku}]. Preferred finish: ${selectedFinish}.`,
      items: [
        {
          id: product.id,
          name: product.name,
          finish: selectedFinish,
          thickness: product.defaultThickness,
          sqFt: parseInt(estimatedSqFt) || 500,
        },
      ],
    });

    setLoading(false);
    if (res.success) {
      setStatus('success');
      setStatusMsg(res.message);
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }, 2500);
    } else {
      setStatus('error');
      setStatusMsg(res.message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg bg-[#0F0F14] border border-[#2A2A38] rounded-sm shadow-2xl p-6 sm:p-8 text-vsaad-ivory">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-vsaad-ivory-dark hover:text-vsaad-ivory rounded focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-vsaad-purple" />
          <span className="text-xs uppercase tracking-widest text-vsaad-purple-light font-sans font-semibold">
            Bespoke Quotation & Sample Request
          </span>
        </div>
        <h2 className="text-2xl font-display font-light text-vsaad-ivory">
          {product.name}
        </h2>
        <p className="text-xs text-vsaad-ivory-muted font-sans mt-1">
          SKU: {product.sku} • Indicative: {product.priceDisplay}
        </p>

        {/* Success State */}
        {status === 'success' ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
            <h3 className="text-lg font-display text-white">Quotation Request Received</h3>
            <p className="text-xs text-vsaad-ivory-muted max-w-xs mx-auto">
              {statusMsg}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans text-xs">
            {status === 'error' && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Select Finish */}
            <div>
              <label className="block text-vsaad-ivory-dark mb-1.5 uppercase tracking-wider text-[10px]">
                Preferred Stone Finish
              </label>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 rounded-xs text-xs transition-colors border ${
                      selectedFinish === f
                        ? 'bg-vsaad-purple/30 border-vsaad-purple text-vsaad-purple-light font-medium'
                        : 'bg-[#171720] border-[#2A2A38] text-vsaad-ivory-muted hover:border-[#3A3A4D]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Area & City Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                  Estimated Area
                </label>
                <select
                  value={estimatedSqFt}
                  onChange={e => setEstimatedSqFt(e.target.value)}
                  className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none"
                >
                  <option value="Under 250 sq.ft">Under 250 sq.ft (Single Countertop)</option>
                  <option value="250 - 600 sq.ft">250 – 600 sq.ft (Kitchen & Island)</option>
                  <option value="600 - 1,500 sq.ft">600 – 1,500 sq.ft (Living Hall)</option>
                  <option value="1,500 - 3,500 sq.ft">1,500 – 3,500 sq.ft (Full Villa)</option>
                  <option value="3,500+ sq.ft">3,500+ sq.ft (Commercial Project)</option>
                </select>
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                  Project City / Site
                </label>
                <input
                  type="text"
                  value={projectLocation}
                  onChange={e => setProjectLocation(e.target.value)}
                  placeholder="e.g. Chennai, Trichy, Bangalore"
                  className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Name & Phone Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="architect@domain.com"
                className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                Project Notes / Custom Edge Profile
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Mention slab thickness (18mm, 20mm, 30mm), edge profile or site inspection requests..."
                className="w-full bg-[#171720] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xs bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white font-medium uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Request...' : 'Send Quote & Sample Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
