import React, { useEffect } from 'react';
import { X, ShieldCheck, Download, Ruler } from 'lucide-react';

interface TilesSpecSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SpecItem {
  parameter: string;
  testStandard: string;
  vsaadValue: string;
  industryStandard: string;
  advantage: string;
}

const SPEC_DATA: SpecItem[] = [
  {
    parameter: 'Water Absorption (Porosity)',
    testStandard: 'ISO 10545-3 / EN 14411',
    vsaadValue: '< 0.04% (Impermeable)',
    industryStandard: '≤ 0.50% (Group BIa)',
    advantage: '12× lower porosity than international standards; absolute stain immunity.',
  },
  {
    parameter: 'Modulus of Rupture (Bending Strength)',
    testStandard: 'ISO 10545-4',
    vsaadValue: '≥ 48 N/mm²',
    industryStandard: '≥ 35 N/mm²',
    advantage: 'Resists mechanical shear stress and substrate deflection under load.',
  },
  {
    parameter: 'Breaking Strength (Load Bearing)',
    testStandard: 'ISO 10545-4',
    vsaadValue: '≥ 2,400 N',
    industryStandard: '≥ 1,300 N',
    advantage: 'Engineered for commercial footfall and light vehicular wheel loads.',
  },
  {
    parameter: 'Surface Hardness (Mohs Scale)',
    testStandard: 'EN 101 / Mohs Scale',
    vsaadValue: 'Mohs 7 - 8',
    industryStandard: 'Mohs 5 - 6',
    advantage: 'Diamond-hard quartz matrix; impervious to keys, stilettos, and quartz grit.',
  },
  {
    parameter: 'Slip Resistance (Ramp Test)',
    testStandard: 'DIN 51130 / BS 7976',
    vsaadValue: 'R10 (Internal) / R11 (Exterior)',
    industryStandard: 'R9',
    advantage: 'Certified wet traction for bathrooms, pool decks, and commercial ramps.',
  },
  {
    parameter: 'Deep Abrasion Resistance',
    testStandard: 'ISO 10545-6',
    vsaadValue: '< 115 mm³',
    industryStandard: '≤ 175 mm³',
    advantage: 'PEI Class IV & V; color and texture remain permanent throughout decades.',
  },
  {
    parameter: 'Thermal Shock & Frost Resistance',
    testStandard: 'ISO 10545-9 / 12',
    vsaadValue: 'Zero degradation (100°C to 15°C)',
    industryStandard: 'Pass required',
    advantage: 'UV-stable pigments; zero cracking or fading across tropical or cold weather.',
  },
  {
    parameter: 'Stain & Chemical Resistance',
    testStandard: 'ISO 10545-13 / 14',
    vsaadValue: 'Class 5 / Class A (Highest)',
    industryStandard: 'Class 3 / Class B',
    advantage: 'Impervious to bleach, tea, coffee, wine, and harsh cleaning solvents.',
  },
];

export const TilesSpecSheetModal: React.FC<TilesSpecSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Technical Specification Sheet"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn"
    >
      {/* Frosted Dark Backdrop with Specular Blur */}
      <div
        className="fixed inset-0 bg-[#040407]/85 backdrop-blur-2xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0B0B11]/95 border border-white/15 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.15)] overflow-hidden">
        {/* Specular Top Rim Light */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0E0E16]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-vsaad-purple/20 border border-vsaad-purple/35 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <ShieldCheck className="w-5 h-5 text-vsaad-purple-light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-medium text-white tracking-tight">
                  VSAAD Vitrified Slabs &amp; Porcelain Technical Spec Sheet
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wider bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/30">
                  ISO 10545 Certified
                </span>
              </div>
              <p className="text-xs text-vsaad-ivory-dark font-sans">
                Laboratory benchmarking against EN 14411 Group BIa international standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-vsaad-ivory-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Key Advantages Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-vsaad-purple-light font-medium">
                Porosity Rating
              </div>
              <div className="font-display text-2xl font-light text-white mt-1">
                &lt; 0.04%
              </div>
              <p className="text-xs text-vsaad-ivory-dark font-sans mt-1">
                Virtually zero moisture absorption; impervious to mildew &amp; freeze thaw.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-vsaad-purple-light font-medium">
                Surface Hardness
              </div>
              <div className="font-display text-2xl font-light text-white mt-1">
                Mohs 7 - 8
              </div>
              <p className="text-xs text-vsaad-ivory-dark font-sans mt-1">
                Outperforms natural marble (Mohs 3-4) and matches natural quartz hardness.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-vsaad-purple-light font-medium">
                Slip Rating
              </div>
              <div className="font-display text-2xl font-light text-white mt-1">
                R10 / R11
              </div>
              <p className="text-xs text-vsaad-ivory-dark font-sans mt-1">
                Certified high slip friction for wet zones, balconies, and exterior pavers.
              </p>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#09090F]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#12121A] text-vsaad-ivory-muted uppercase tracking-[0.12em] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4 font-medium">Physical Parameter</th>
                  <th className="py-3 px-3 font-medium">Test Standard</th>
                  <th className="py-3 px-3 font-medium text-vsaad-purple-light">VSAAD Benchmark</th>
                  <th className="py-3 px-3 font-medium">ISO / EN Standard</th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">Architectural Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-vsaad-ivory-light">
                {SPEC_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{item.parameter}</td>
                    <td className="py-3 px-3 text-vsaad-ivory-dark font-mono text-[11px]">{item.testStandard}</td>
                    <td className="py-3 px-3 font-semibold text-vsaad-purple-light">{item.vsaadValue}</td>
                    <td className="py-3 px-3 text-vsaad-ivory-dark">{item.industryStandard}</td>
                    <td className="py-3 px-4 text-vsaad-ivory-muted text-[11px] hidden md:table-cell">{item.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formats & Dimensions Reference */}
          <div className="p-5 rounded-xl bg-vsaad-purple/[0.04] border border-vsaad-purple/20">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-vsaad-purple-light mb-3 flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Standard Architectural Calibers &amp; Edge Rectification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div className="p-2.5 rounded bg-[#0A0A0E] border border-white/10">
                <span className="text-white font-medium block">1200 × 2400 mm</span>
                <span className="text-[10px] text-vsaad-ivory-dark">Slab • 9mm / 6mm</span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0A0E] border border-white/10">
                <span className="text-white font-medium block">800 × 1600 mm</span>
                <span className="text-[10px] text-vsaad-ivory-dark">Large Format • 9mm</span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0A0E] border border-white/10">
                <span className="text-white font-medium block">600 × 1200 mm</span>
                <span className="text-[10px] text-vsaad-ivory-dark">Versatile • 9mm</span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0A0E] border border-white/10">
                <span className="text-white font-medium block">600 × 600 mm</span>
                <span className="text-[10px] text-vsaad-ivory-dark">Paver • 20mm / 15mm</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-vsaad-ivory-dark leading-relaxed">
              * All slabs are laser diamond-rectified with 90° orthogonal edges permitting tight 1mm grout lines for seamless visual monolithic continuity.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0E0E16]/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-vsaad-ivory-dark font-sans text-center sm:text-left">
            Need physical sample pieces or lab batch certificates for your BOQ?
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('VSAAD Architectural Specification Dossier (PDF) will be prepared with your custom sample kit.');
              }}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-vsaad-purple hover:bg-vsaad-purple-light transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Spec Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-vsaad-ivory-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
