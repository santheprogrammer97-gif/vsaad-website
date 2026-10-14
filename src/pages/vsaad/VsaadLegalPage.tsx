import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const VsaadLegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Privacy Policy';
  let subtitle = 'Our commitment to client privacy and data integrity.';
  let type: 'privacy' | 'terms' | 'shipping' = 'privacy';

  if (path.includes('terms')) {
    title = 'Terms & Conditions';
    subtitle = 'Quotation protocols, custom cutting specifications, and commercial agreements.';
    type = 'terms';
  } else if (path.includes('shipping')) {
    title = 'Shipping & Logistics Policy';
    subtitle = 'Cushioned timber A-frame transport, crane offloading, and Pan-India delivery.';
    type = 'shipping';
  }

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-vsaad-ivory-dark hover:text-vsaad-purple-light transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div>
          <span className="text-xs font-mono tracking-widest text-vsaad-purple-light uppercase">
            Official Policy
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted font-sans mt-2">
            {subtitle} • Effective Date: October 2026
          </p>
        </div>

        <div className="p-8 sm:p-12 bg-[#0F0F14] border border-[#22222E] rounded-sm prose prose-invert max-w-none text-xs sm:text-sm font-sans text-vsaad-ivory-muted leading-relaxed space-y-6">
          {type === 'privacy' && (
            <>
              <h2 className="text-xl font-display text-vsaad-ivory">1. Information We Collect</h2>
              <p>
                When you submit an architectural quotation request or contact our Chennai showroom, VSAAD collects contact credentials (name, phone number, email address), project site details, and estimated square footage necessary to assess slab quantities and logistics.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">2. How Information is Used</h2>
              <p>
                Client data is strictly utilized to communicate quarry availability, calculate gangsaw cutting layouts, coordinate site inspections, and dispatch transit tracking. We never monetize, lease, or share client information with external third parties.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">3. Data Retention & Security</h2>
              <p>
                All quotation records and site measurements are secured on private encrypted servers. Clients may request deletion or rectification of their contact records at any time by contacting privacy@vsaad.com.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h2 className="text-xl font-display text-vsaad-ivory">1. Geological Inherent Characteristics</h2>
              <p>
                Natural granite and marble are organic igneous and metamorphic minerals formed under geothermal heat. Subtle variations in quartz veining, background tone, and mineral flecks are inherent hallmarks of authentic stone, not defects. We invite clients to inspect and tag specific gangsaw bundles at our Chennai showroom prior to final fabrication.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">2. Quotation Validity & Pricing</h2>
              <p>
                Indicative rates displayed on the catalogue reflect factory slab rates per square foot exclusive of custom waterjet cutting, edge bullnosing, crane offloading, and GST. Official quotations remain valid for 14 calendar days from date of issuance.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">3. Custom Cutting & Waterjet Fabrication</h2>
              <p>
                Slabs cut to custom architectural templates, sink cutouts, or edge-chamfered profiles cannot be cancelled once digital waterjet sawing commences.
              </p>
            </>
          )}

          {type === 'shipping' && (
            <>
              <h2 className="text-xl font-display text-vsaad-ivory">1. Cushioned A-Frame Transit</h2>
              <p>
                Natural stone slabs are transported vertically on heavy-gauge steel and timber A-frames fitted with high-density polyurethane dampeners. Slabs are never laid flat during transit to prevent road vibration stress.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">2. Delivery Timeframes & Site Access</h2>
              <p>
                In-stock standard slabs are dispatched within 24 to 48 hours within Tamil Nadu and 3 to 6 days across Pan-India. Clients are responsible for ensuring adequate road clearance for heavy flatbed trucks and arranging crane or hydraulic hoist access where required.
              </p>

              <h2 className="text-xl font-display text-vsaad-ivory">3. Transit Insurance & Delivery Inspection</h2>
              <p>
                Every consignment is covered by comprehensive transit insurance. Clients or their site engineers must inspect slab seals upon offloading prior to signing the delivery consignment note.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
