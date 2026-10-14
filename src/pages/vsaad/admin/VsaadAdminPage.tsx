import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
  Settings,
  Globe,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { useVsaad } from '../../../context/VsaadContext';
import type {
  VsaadProduct,
  VsaadGalleryItem,
  VsaadBlogPost,
  VsaadFaqItem,
  VsaadMediaAsset,
} from '../../../types/vsaadTypes';

type AdminTab =
  | 'overview'
  | 'enquiries'
  | 'products'
  | 'gallery'
  | 'media'
  | 'blog'
  | 'faqs'
  | 'pages'
  | 'seo'
  | 'settings';

export const VsaadAdminPage: React.FC = () => {
  const {
    siteConfig,
    products,
    gallery,
    blogPosts,
    faqs,
    enquiries,
    media,
    updateCmsCollection,
    updateEnquiryStatus,
    deleteEnquiry,
    refreshData,
  } = useVsaad();

  // Authentication State
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('vsaad_admin_token');
  });
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab synchronized with URL
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as AdminTab | null;
  const [activeTab, setActiveTabState] = useState<AdminTab>(tabFromUrl || 'overview');

  const setActiveTab = (tab: AdminTab) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/vsaad/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.user?.token) {
        setAuthToken(json.user.token);
        localStorage.setItem('vsaad_admin_token', json.user.token);
        setPasswordInput('');
        showToast('Authenticated as VSAAD Administrator');
      } else {
        setAuthError(json.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Connection error contacting authentication endpoint');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('vsaad_admin_token');
  };

  // State for Product Editor Modal
  const [editingProduct, setEditingProduct] = useState<VsaadProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // State for Gallery Item Modal
  const [editingGallery, setEditingGallery] = useState<VsaadGalleryItem | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // State for Blog Editor Modal
  const [editingBlog, setEditingBlog] = useState<VsaadBlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // State for FAQ Editor Modal
  const [editingFaq, setEditingFaq] = useState<VsaadFaqItem | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // State for Media Asset Modal
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaAlt, setNewMediaAlt] = useState('');

  // Editable Site Settings
  const [editableSettings, setEditableSettings] = useState(siteConfig);
  useEffect(() => {
    if (siteConfig) setEditableSettings(siteConfig);
  }, [siteConfig]);

  // If Not Authenticated, Render Secure Login Barrier
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#08080A] text-vsaad-ivory flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0F0F14] border border-[#22222E] rounded-sm p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-vsaad-purple/20 border border-vsaad-purple flex items-center justify-center mx-auto text-vsaad-purple-light">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display uppercase tracking-widest text-vsaad-ivory">
              VSAAD Showroom CMS
            </h1>
            <p className="text-xs text-vsaad-ivory-muted font-sans">
              Restricted portal for showroom directors & master masons.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            <div>
              <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                Administrator Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                Access Key / Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2.5 text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep hover:from-vsaad-purple-light hover:to-vsaad-purple text-white uppercase tracking-[0.2em] font-medium rounded-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
            >
              {authLoading ? 'Verifying...' : 'Access Private Console'}
            </button>
          </form>

          <div className="pt-4 border-t border-[#1C1C26] text-center">
            <Link to="/" className="text-xs text-vsaad-ivory-dark hover:text-vsaad-ivory transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- CRUD HELPERS ---

  // Product Save/Delete
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    let updatedList: VsaadProduct[];
    const exists = products.some(p => p.id === editingProduct.id);

    if (exists) {
      updatedList = products.map(p => (p.id === editingProduct.id ? editingProduct : p));
    } else {
      updatedList = [editingProduct, ...products];
    }

    const ok = await updateCmsCollection('products', updatedList);
    if (ok) {
      showToast('Product saved successfully');
      setIsProductModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    const updatedList = products.filter(p => p.id !== id);
    const ok = await updateCmsCollection('products', updatedList);
    if (ok) showToast('Product removed');
  };

  // Gallery Save/Delete
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    let updatedList: VsaadGalleryItem[];
    const exists = gallery.some(g => g.id === editingGallery.id);

    if (exists) {
      updatedList = gallery.map(g => (g.id === editingGallery.id ? editingGallery : g));
    } else {
      updatedList = [editingGallery, ...gallery];
    }

    const ok = await updateCmsCollection('gallery', updatedList);
    if (ok) {
      showToast('Gallery item saved');
      setIsGalleryModalOpen(false);
      setEditingGallery(null);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Remove this project from architectural gallery?')) return;
    const updatedList = gallery.filter(g => g.id !== id);
    const ok = await updateCmsCollection('gallery', updatedList);
    if (ok) showToast('Gallery item removed');
  };

  // Blog Save/Delete
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    let updatedList: VsaadBlogPost[];
    const exists = blogPosts.some(b => b.id === editingBlog.id);

    if (exists) {
      updatedList = blogPosts.map(b => (b.id === editingBlog.id ? editingBlog : b));
    } else {
      updatedList = [editingBlog, ...blogPosts];
    }

    const ok = await updateCmsCollection('blogPosts', updatedList);
    if (ok) {
      showToast('Article published / saved');
      setIsBlogModalOpen(false);
      setEditingBlog(null);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this journal article?')) return;
    const updatedList = blogPosts.filter(b => b.id !== id);
    const ok = await updateCmsCollection('blogPosts', updatedList);
    if (ok) showToast('Article deleted');
  };

  // FAQ Save/Delete
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    let updatedList: VsaadFaqItem[];
    const exists = faqs.some(f => f.id === editingFaq.id);

    if (exists) {
      updatedList = faqs.map(f => (f.id === editingFaq.id ? editingFaq : f));
    } else {
      updatedList = [editingFaq, ...faqs];
    }

    const ok = await updateCmsCollection('faqs', updatedList);
    if (ok) {
      showToast('FAQ entry saved');
      setIsFaqModalOpen(false);
      setEditingFaq(null);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Remove this FAQ item?')) return;
    const updatedList = faqs.filter(f => f.id !== id);
    const ok = await updateCmsCollection('faqs', updatedList);
    if (ok) showToast('FAQ entry removed');
  };

  // Media Asset Upload/Register
  const handleRegisterMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;

    const newAsset: VsaadMediaAsset = {
      id: 'med-' + Date.now(),
      name: newMediaName.trim() || 'Stone Image Asset',
      url: newMediaUrl.trim(),
      alt: newMediaAlt.trim() || 'VSAAD Stone Asset',
      type: 'image/jpeg',
      size: 'Remote / Uploaded',
      createdAt: new Date().toISOString(),
    };

    const updatedMedia = [newAsset, ...media];
    const ok = await updateCmsCollection('media', updatedMedia);
    if (ok) {
      showToast('Media registered in library');
      setNewMediaUrl('');
      setNewMediaName('');
      setNewMediaAlt('');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editableSettings) return;
    const ok = await updateCmsCollection('siteConfig', editableSettings);
    if (ok) showToast('Site settings updated successfully');
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-vsaad-ivory font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-vsaad-purple text-white text-xs font-sans rounded-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="h-16 bg-[#0D0D12] border-b border-[#22222E] px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2" target="_blank" title="View Public Website">
            <span className="font-display tracking-[0.25em] text-xl font-light text-vsaad-ivory uppercase">
              VSAAD
            </span>
            <span className="text-[10px] tracking-widest text-vsaad-purple-light uppercase px-2 py-0.5 rounded bg-vsaad-purple/10 border border-vsaad-purple/30">
              Admin CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            type="button"
            onClick={() => refreshData().then(() => showToast('Synced database'))}
            className="p-2 text-vsaad-ivory-dark hover:text-vsaad-ivory transition-colors flex items-center gap-1.5"
            title="Refresh database"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-vsaad-ivory-muted hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Public Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171720] border border-[#2A2A38] hover:border-red-500 text-vsaad-ivory hover:text-red-400 rounded-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-56 bg-[#0B0B0F] border-r border-[#1C1C26] p-4 flex flex-col justify-between shrink-0">
          <nav className="space-y-1 text-xs">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'enquiries', label: 'Enquiries & Quotes', icon: MessageSquare, badge: enquiries.filter(e => e.status === 'new').length },
              { id: 'products', label: 'Product Manager', icon: Package },
              { id: 'gallery', label: 'Gallery Manager', icon: Layers },
              { id: 'media', label: 'Media Library', icon: ImageIcon },
              { id: 'blog', label: 'Journal CMS', icon: BookOpen },
              { id: 'faqs', label: 'FAQ Manager', icon: HelpCircle },
              { id: 'seo', label: 'SEO Studio', icon: Globe },
              { id: 'settings', label: 'Showroom Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors text-left ${
                    isActive
                      ? 'bg-vsaad-purple/20 text-vsaad-purple-light font-medium border-l-2 border-vsaad-purple'
                      : 'text-vsaad-ivory-muted hover:text-vsaad-ivory hover:bg-[#121218]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-vsaad-purple text-white text-[10px] flex items-center justify-center font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#1C1C26] text-[11px] text-vsaad-ivory-dark">
            <p>VSAAD v1.0.0</p>
            <p className="text-[10px]">Chennai Headquarters</p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#08080A]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-display text-vsaad-ivory">Showroom Operations Overview</h1>
                <p className="text-xs text-vsaad-ivory-muted mt-1">Live metrics from your persistent VSAAD database.</p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-vsaad-ivory-dark">
                    Active Stone Slabs
                  </span>
                  <div className="text-3xl font-display font-light text-vsaad-ivory mt-2">
                    {products.length}
                  </div>
                  <p className="text-[11px] text-vsaad-ivory-muted mt-1">
                    {products.filter(p => p.featured).length} Signature collections
                  </p>
                </div>

                <div className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-vsaad-ivory-dark">
                    Inbound Enquiries / Quotes
                  </span>
                  <div className="text-3xl font-display font-light text-vsaad-purple-light mt-2">
                    {enquiries.length}
                  </div>
                  <p className="text-[11px] text-vsaad-ivory-muted mt-1">
                    {enquiries.filter(e => e.status === 'new').length} Pending review
                  </p>
                </div>

                <div className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-vsaad-ivory-dark">
                    Gallery Projects
                  </span>
                  <div className="text-3xl font-display font-light text-vsaad-ivory mt-2">
                    {gallery.length}
                  </div>
                  <p className="text-[11px] text-vsaad-ivory-muted mt-1">
                    Across residential & commercial
                  </p>
                </div>

                <div className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-vsaad-ivory-dark">
                    Published Journal Articles
                  </span>
                  <div className="text-3xl font-display font-light text-vsaad-ivory mt-2">
                    {blogPosts.length}
                  </div>
                  <p className="text-[11px] text-vsaad-ivory-muted mt-1">
                    Masonry & architectural guides
                  </p>
                </div>
              </div>

              {/* Latest Enquiries Preview */}
              <div className="bg-[#0F0F14] border border-[#22222E] rounded-xs p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-display text-vsaad-ivory">Recent Inbound Quote Requests</h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-vsaad-purple-light hover:underline"
                  >
                    View All Enquiries →
                  </button>
                </div>

                <div className="divide-y divide-[#1C1C26]">
                  {enquiries.slice(0, 4).map(enq => (
                    <div key={enq.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-vsaad-ivory font-medium">{enq.name}</strong>
                          <span className="font-mono text-[10px] text-vsaad-ivory-dark">{enq.phone}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              enq.status === 'new'
                                ? 'bg-amber-950 text-amber-300'
                                : enq.status === 'contacted'
                                ? 'bg-blue-950 text-blue-300'
                                : 'bg-green-950 text-green-300'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-vsaad-ivory-muted text-[11px] mt-0.5">
                          {enq.productInterest || 'General Interest'} • {enq.projectLocation || 'Tamil Nadu'}
                        </p>
                      </div>
                      <span className="text-[10px] text-vsaad-ivory-dark font-mono">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES & QUOTES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display text-vsaad-ivory">Enquiries & Quotation Desk</h1>
                  <p className="text-xs text-vsaad-ivory-muted mt-1">Manage incoming quote requests, client notes, and status.</p>
                </div>
              </div>

              <div className="space-y-4">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C1C26] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/30">
                          {enq.type}
                        </span>
                        <h3 className="text-base font-display text-vsaad-ivory">{enq.name}</h3>
                        <span className="text-xs text-vsaad-ivory-muted">{enq.phone}</span>
                        {enq.email && <span className="text-xs text-vsaad-ivory-dark">({enq.email})</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={e => updateEnquiryStatus(enq.id, e.target.value as any)}
                          className="bg-[#171720] border border-[#2A2A38] rounded-xs px-2.5 py-1 text-xs text-vsaad-ivory focus:outline-none"
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="quoted">Status: Quoted</option>
                          <option value="closed">Status: Closed</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => deleteEnquiry(enq.id)}
                          className="p-1.5 text-vsaad-ivory-dark hover:text-red-400 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-vsaad-ivory-dark uppercase tracking-wider block">
                          Material & Project
                        </span>
                        <p className="text-vsaad-ivory mt-0.5">{enq.productInterest}</p>
                        <p className="text-vsaad-ivory-muted text-[11px]">
                          Location: {enq.projectLocation || 'Not specified'} • Area: {enq.estimatedSqFt || 'Not specified'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] text-vsaad-ivory-dark uppercase tracking-wider block">
                          Client Message / Notes
                        </span>
                        <p className="text-vsaad-ivory-muted mt-0.5 italic">
                          "{enq.message || 'No additional message.'}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display text-vsaad-ivory">Product Inventory Manager</h1>
                  <p className="text-xs text-vsaad-ivory-muted mt-1">Add, update, or archive natural granite slabs and architectural tiles.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct({
                      id: 'prod-' + Date.now(),
                      sku: 'VSD-GRN-' + Math.floor(100 + Math.random() * 900),
                      name: '',
                      slug: '',
                      category: 'granite',
                      categoryName: 'Granite',
                      finishGroup: 'Polished',
                      tagline: '',
                      description: '',
                      finishes: ['Polished'],
                      defaultFinish: 'Polished',
                      thicknesses: ['Custom Cut'],
                      defaultThickness: 'Custom Cut',
                      origin: 'South India',
                      applications: ['Kitchen Countertops', 'Flooring'],
                      pricePerSqFt: 300,
                      priceDisplay: 'Request a Quote',
                      featured: false,
                      inStock: true,
                      primaryImage: '/images/product-black-galaxy.jpg',
                      galleryImages: [],
                      color: 'Natural',
                      colorFamily: 'black',
                      adminNote: '',
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Table */}
              <div className="bg-[#0F0F14] border border-[#22222E] rounded-xs overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#121218] border-b border-[#22222E] text-vsaad-ivory-dark uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">SKU / Name</th>
                      <th className="p-3.5">Category & Finish</th>
                      <th className="p-3.5">Pricing</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1C26]">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-[#121218]/60 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={prod.primaryImage}
                            alt={prod.name}
                            className="w-12 h-9 object-cover rounded-xs border border-[#2A2A38]"
                          />
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-[10px] text-vsaad-purple-light block">
                            {prod.sku}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-vsaad-ivory text-sm">{prod.name}</span>
                            {prod.adminNote && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-950/80 border border-amber-600/40 text-amber-300 font-sans" title={prod.adminNote}>
                                Review Flag
                              </span>
                            )}
                          </div>
                          {prod.adminNote && (
                            <span className="text-[10px] text-amber-400/80 block mt-0.5 italic">{prod.adminNote}</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="text-vsaad-ivory-muted capitalize block">{prod.category}</span>
                          {prod.finishGroup && (
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono mt-0.5 ${
                              prod.finishGroup === 'Lapotra'
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-700/30'
                                : 'bg-vsaad-purple/20 text-vsaad-purple-light border border-vsaad-purple/30'
                            }`}>
                              {prod.finishGroup}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-vsaad-ivory">{prod.priceDisplay}</td>
                        <td className="p-3.5">
                          {prod.featured ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-vsaad-purple/30 text-vsaad-purple-light font-bold">
                              Featured
                            </span>
                          ) : (
                            <span className="text-vsaad-ivory-dark text-[10px]">Standard</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1 text-vsaad-ivory-muted hover:text-vsaad-purple-light"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1 text-vsaad-ivory-muted hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display text-vsaad-ivory">Architectural Gallery Manager</h1>
                  <p className="text-xs text-vsaad-ivory-muted mt-1">Upload and manage project installation showcases.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingGallery({
                      id: 'gal-' + Date.now(),
                      title: '',
                      category: 'interiors',
                      categoryLabel: 'Residential Interiors',
                      image: '/images/gallery-kitchen-island.jpg',
                      description: '',
                      location: 'Chennai',
                      material: 'Granite',
                    });
                    setIsGalleryModalOpen(true);
                  }}
                  className="px-4 py-2 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {gallery.map(item => (
                  <div key={item.id} className="bg-[#0F0F14] border border-[#22222E] rounded-sm overflow-hidden p-4 space-y-3">
                    <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover rounded-xs" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-vsaad-purple-light">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-display text-base text-vsaad-ivory">{item.title}</h3>
                      <p className="text-xs text-vsaad-ivory-muted font-sans line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#1C1C26] flex items-center justify-between text-xs">
                      <span className="text-vsaad-ivory-dark">{item.location}</span>
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGallery(item);
                            setIsGalleryModalOpen(true);
                          }}
                          className="text-vsaad-ivory-muted hover:text-vsaad-purple-light"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGallery(item.id)}
                          className="text-vsaad-ivory-muted hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-display text-vsaad-ivory">Media Library</h1>
                <p className="text-xs text-vsaad-ivory-muted mt-1">Shared image assets for products, gallery, and articles.</p>
              </div>

              {/* Quick URL Register Form */}
              <form onSubmit={handleRegisterMedia} className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-3 text-xs font-sans">
                <span className="text-[10px] uppercase tracking-wider text-vsaad-purple-light font-bold">
                  Register or Link Image URL
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Image URL (e.g. /images/filename.jpg)"
                    value={newMediaUrl}
                    onChange={e => setNewMediaUrl(e.target.value)}
                    className="bg-[#16161F] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Asset Title (e.g. Black Galaxy Polish)"
                    value={newMediaName}
                    onChange={e => setNewMediaName(e.target.value)}
                    className="bg-[#16161F] border border-[#2A2A38] rounded-xs px-3 py-2 text-vsaad-ivory focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2 bg-vsaad-purple hover:bg-vsaad-purple-light text-white uppercase tracking-wider rounded-xs font-medium"
                  >
                    Add to Media Library
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {media.map(m => (
                  <div key={m.id} className="p-3 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-2 text-xs font-sans">
                    <img src={m.url} alt={m.alt} className="w-full aspect-[4/3] object-cover rounded-xs" />
                    <p className="font-medium text-vsaad-ivory truncate">{m.name}</p>
                    <p className="text-[10px] font-mono text-vsaad-ivory-dark truncate">{m.url}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BLOG CMS */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display text-vsaad-ivory">Journal & Editorial CMS</h1>
                  <p className="text-xs text-vsaad-ivory-muted mt-1">Compose masonry articles, guidelines, and care tips.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog({
                      id: 'post-' + Date.now(),
                      slug: 'new-article-' + Date.now(),
                      title: '',
                      excerpt: '',
                      content: '',
                      category: 'Design & Advice',
                      author: 'VSAAD Stone Advisory',
                      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                      readTime: '5 min read',
                      image: '/images/gallery-exterior-facade.jpg',
                      tags: ['Granite', 'Architecture'],
                    });
                    setIsBlogModalOpen(true);
                  }}
                  className="px-4 py-2 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Journal Article</span>
                </button>
              </div>

              <div className="space-y-4">
                {blogPosts.map(post => (
                  <div key={post.id} className="p-5 bg-[#0F0F14] border border-[#22222E] rounded-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={post.image} alt={post.title} className="w-20 h-14 object-cover rounded-xs border border-[#2A2A38]" />
                      <div>
                        <span className="text-[10px] font-mono text-vsaad-purple-light uppercase">
                          {post.category} • {post.date}
                        </span>
                        <h3 className="text-base font-display text-vsaad-ivory">{post.title}</h3>
                        <p className="text-xs text-vsaad-ivory-muted line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBlog(post);
                          setIsBlogModalOpen(true);
                        }}
                        className="p-2 text-vsaad-ivory-muted hover:text-vsaad-purple-light"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(post.id)}
                        className="p-2 text-vsaad-ivory-muted hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FAQ MANAGER */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display text-vsaad-ivory">Frequently Asked Questions Manager</h1>
                  <p className="text-xs text-vsaad-ivory-muted mt-1">Manage client questions by category.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingFaq({
                      id: 'faq-' + Date.now(),
                      question: '',
                      answer: '',
                      category: 'Products',
                    });
                    setIsFaqModalOpen(true);
                  }}
                  className="px-4 py-2 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map(faq => (
                  <div key={faq.id} className="p-4 bg-[#0F0F14] border border-[#22222E] rounded-xs flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-vsaad-purple-light uppercase">
                        Category: {faq.category}
                      </span>
                      <h3 className="text-sm font-display text-vsaad-ivory">{faq.question}</h3>
                      <p className="text-xs text-vsaad-ivory-muted font-sans leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(faq);
                          setIsFaqModalOpen(true);
                        }}
                        className="p-1.5 text-vsaad-ivory-muted hover:text-vsaad-purple-light"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 text-vsaad-ivory-muted hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SEO STUDIO */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-display text-vsaad-ivory">SEO Studio & Metadata</h1>
                <p className="text-xs text-vsaad-ivory-muted mt-1">Configure search engine titles, open-graph cards, and structured schema.</p>
              </div>

              <div className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Default Title Tag
                  </label>
                  <input
                    type="text"
                    value={editableSettings?.seo.defaultTitle || ''}
                    onChange={e =>
                      setEditableSettings(prev =>
                        prev ? { ...prev, seo: { ...prev.seo, defaultTitle: e.target.value } } : prev
                      )
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Default Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={editableSettings?.seo.defaultDescription || ''}
                    onChange={e =>
                      setEditableSettings(prev =>
                        prev ? { ...prev, seo: { ...prev.seo, defaultDescription: e.target.value } } : prev
                      )
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Social Open Graph Image Path
                  </label>
                  <input
                    type="text"
                    value={editableSettings?.seo.ogImage || ''}
                    onChange={e =>
                      setEditableSettings(prev =>
                        prev ? { ...prev, seo: { ...prev.seo, ogImage: e.target.value } } : prev
                      )
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs font-medium"
                >
                  Save SEO Parameters
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && editableSettings && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-display text-vsaad-ivory">Showroom & Business Settings</h1>
                <p className="text-xs text-vsaad-ivory-muted mt-1">Configure company credentials, address, and hours.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 bg-[#0F0F14] border border-[#22222E] rounded-xs space-y-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={editableSettings.name}
                      onChange={e => setEditableSettings({ ...editableSettings, name: e.target.value })}
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={editableSettings.tagline}
                      onChange={e => setEditableSettings({ ...editableSettings, tagline: e.target.value })}
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={editableSettings.contact.phone}
                      onChange={e =>
                        setEditableSettings({
                          ...editableSettings,
                          contact: { ...editableSettings.contact, phone: e.target.value },
                        })
                      }
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={editableSettings.contact.email}
                      onChange={e =>
                        setEditableSettings({
                          ...editableSettings,
                          contact: { ...editableSettings.contact, email: e.target.value },
                        })
                      }
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                    Showroom Address
                  </label>
                  <input
                    type="text"
                    value={editableSettings.contact.address}
                    onChange={e =>
                      setEditableSettings({
                        ...editableSettings,
                        contact: { ...editableSettings.contact, address: e.target.value },
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={`${editableSettings.contact.city}, ${editableSettings.contact.state}`}
                      onChange={e =>
                        setEditableSettings({
                          ...editableSettings,
                          contact: { ...editableSettings.contact, city: e.target.value },
                        })
                      }
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-vsaad-ivory-dark mb-1 uppercase tracking-wider text-[10px]">
                      Inspection Hours
                    </label>
                    <input
                      type="text"
                      value={editableSettings.contact.workingHours}
                      onChange={e =>
                        setEditableSettings({
                          ...editableSettings,
                          contact: { ...editableSettings.contact, workingHours: e.target.value },
                        })
                      }
                      className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs px-3.5 py-2 text-vsaad-ivory focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-vsaad-purple hover:bg-vsaad-purple-light text-white text-xs uppercase tracking-wider rounded-xs font-medium"
                >
                  Save Showroom Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: EDIT PRODUCT */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F14] border border-[#2A2A38] rounded-sm p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs font-sans text-vsaad-ivory space-y-4">
            <h2 className="text-xl font-display text-white">
              {products.some(p => p.id === editingProduct.id) ? 'Edit Stone Slab' : 'Create New Stone Slab'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as any,
                        categoryName: e.target.value === 'granite' ? 'Granite' : 'Tiles',
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  >
                    <option value="granite">Granite</option>
                    <option value="tiles">Tiles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Finish Group</label>
                  <select
                    value={editingProduct.finishGroup || 'Polished'}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        finishGroup: e.target.value as any,
                        finishes: [e.target.value],
                        defaultFinish: e.target.value,
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  >
                    <option value="Polished">Polished Granite</option>
                    <option value="Lapotra">Lapotra Granite</option>
                    <option value="Vitrified">Vitrified (Tiles)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Pricing Label</label>
                  <input
                    type="text"
                    value={editingProduct.priceDisplay || 'Request a Quote'}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        priceDisplay: e.target.value,
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                    placeholder="Request a Quote"
                  />
                </div>
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Origin / Quarry</label>
                  <input
                    type="text"
                    value={editingProduct.origin || 'South India'}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        origin: e.target.value,
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Admin Review Note (Spelling / Catalogue Flag)</label>
                <input
                  type="text"
                  value={editingProduct.adminNote || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, adminNote: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs text-amber-200 placeholder-vsaad-ivory-dark"
                  placeholder="e.g. Flagged for administrator review: Commercial variant of Black Galaxy"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Primary Image URL</label>
                <input
                  type="text"
                  value={editingProduct.primaryImage}
                  onChange={e => setEditingProduct({ ...editingProduct, primaryImage: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={editingProduct.featured}
                  onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                />
                <label htmlFor="featuredToggle">Mark as Signature / Featured Slab</label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1C1C26]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-[#171720] text-vsaad-ivory rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-vsaad-purple text-white rounded-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT GALLERY */}
      {isGalleryModalOpen && editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F14] border border-[#2A2A38] rounded-sm p-6 w-full max-w-lg text-xs font-sans text-vsaad-ivory space-y-4">
            <h2 className="text-xl font-display text-white">Save Gallery Project</h2>
            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingGallery.title}
                  onChange={e => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingGallery.image}
                  onChange={e => setEditingGallery({ ...editingGallery, image: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Category</label>
                  <select
                    value={editingGallery.category}
                    onChange={e =>
                      setEditingGallery({
                        ...editingGallery,
                        category: e.target.value as any,
                        categoryLabel: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  >
                    <option value="interiors">Residential Interiors</option>
                    <option value="kitchens">Kitchens & Countertops</option>
                    <option value="commercial">Commercial Spaces</option>
                    <option value="flooring">Flooring</option>
                    <option value="staircases">Staircases</option>
                    <option value="cladding">Wall Applications</option>
                    <option value="closeups">Stone Close-ups</option>
                  </select>
                </div>
                <div>
                  <label className="block text-vsaad-ivory-dark mb-1">Location</label>
                  <input
                    type="text"
                    value={editingGallery.location || ''}
                    onChange={e => setEditingGallery({ ...editingGallery, location: e.target.value })}
                    className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Project Description</label>
                <textarea
                  rows={2}
                  value={editingGallery.description}
                  onChange={e => setEditingGallery({ ...editingGallery, description: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1C1C26]">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 bg-[#171720] text-vsaad-ivory rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-vsaad-purple text-white rounded-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BLOG */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F14] border border-[#2A2A38] rounded-sm p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs font-sans text-vsaad-ivory space-y-4">
            <h2 className="text-xl font-display text-white">Edit Journal Article</h2>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={e =>
                    setEditingBlog({
                      ...editingBlog,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    })
                  }
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingBlog.image}
                  onChange={e => setEditingBlog({ ...editingBlog, image: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Full Article Body</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1C1C26]">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 bg-[#171720] text-vsaad-ivory rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-vsaad-purple text-white rounded-xs"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT FAQ */}
      {isFaqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F14] border border-[#2A2A38] rounded-sm p-6 w-full max-w-lg text-xs font-sans text-vsaad-ivory space-y-4">
            <h2 className="text-xl font-display text-white">Save FAQ Entry</h2>
            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Category</label>
                <input
                  type="text"
                  value={editingFaq.category}
                  onChange={e => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-vsaad-ivory-dark mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-[#16161F] border border-[#2A2A38] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1C1C26]">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-[#171720] text-vsaad-ivory rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-vsaad-purple text-white rounded-xs"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
