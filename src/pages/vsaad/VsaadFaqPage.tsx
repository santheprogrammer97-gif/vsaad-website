import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, HelpCircle, PhoneCall } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadFaqPage: React.FC = () => {
  const { faqs, siteConfig } = useVsaad();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // Open first by default
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach(f => set.add(f.category));
    return ['all', ...Array.from(set)];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Architectural Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2">
            Clear technical answers regarding natural granite specifications, gangsaw tolerances, laser templating, sealing, and delivery logistics.
          </p>

          {/* Search Box */}
          <div className="relative mt-8">
            <Search className="w-4 h-4 text-vsaad-ivory-dark absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full bg-[#121218] border border-[#2A2A38] rounded-xs pl-11 pr-4 py-3 text-xs text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 font-sans"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-xs text-xs font-sans uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-vsaad-purple text-white'
                    : 'bg-[#121218] border border-[#2A2A38] text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-[#0F0F14] border border-[#22222E] rounded-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-vsaad-purple shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <span className="text-base sm:text-lg font-display text-vsaad-ivory">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded bg-[#171720] text-vsaad-ivory-dark shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-vsaad-ivory-muted leading-relaxed border-t border-[#1C1C26]/60">
                    <p className="pl-5 border-l-2 border-vsaad-purple/40">{faq.answer}</p>
                    <div className="mt-3 pl-5 flex items-center gap-2 text-[10px] text-vsaad-ivory-dark font-mono uppercase">
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 p-8 bg-[#0F0F14] border border-[#2A2A38] rounded-sm text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-vsaad-purple mx-auto" />
          <h2 className="text-2xl font-display text-vsaad-ivory">Have an Unlisted Technical Query?</h2>
          <p className="text-xs text-vsaad-ivory-muted max-w-md mx-auto font-sans leading-relaxed">
            Our Chennai showroom staff can advise on structural loads, waterjet profile tolerances, and chemical stain resistance tests for specific quarries.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              Contact Showroom
            </Link>
            <a
              href={`tel:${(siteConfig?.contact.phone || '+919876543210').replace(/[^0-9]/g, '')}`}
              className="px-6 py-2.5 bg-[#171720] border border-[#2A2A38] text-vsaad-ivory text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-vsaad-purple" />
              <span>Call +91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
