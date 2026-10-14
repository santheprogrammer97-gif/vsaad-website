import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Clock } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadJournalPage: React.FC = () => {
  const { blogPosts } = useVsaad();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach(post => post.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedTag !== 'all' && !post.tags?.includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [blogPosts, searchQuery, selectedTag]);

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-vsaad-purple-light font-sans font-semibold">
            Architectural Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory mt-2">
            The VSAAD Journal
          </h1>
          <p className="text-xs sm:text-sm text-vsaad-ivory-muted max-w-xl font-sans mt-2">
            Expert guidance, stone science, masonry techniques, and interior design wisdom from our senior masons and materials architects.
          </p>
        </div>

        {/* Search & Tag Filter Strip */}
        <div className="bg-[#0F0F14] border border-[#22222E] rounded-sm p-4 sm:p-6 mb-10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-vsaad-ivory-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, masonry topic, or stone type..."
              className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xs pl-10 pr-4 py-2 text-xs text-vsaad-ivory focus:border-vsaad-purple focus:outline-none placeholder:text-gray-600 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1C1C26] text-xs font-sans">
            <span className="text-[11px] text-vsaad-ivory-dark uppercase tracking-wider">Topics:</span>
            <button
              type="button"
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-xs transition-colors ${
                selectedTag === 'all'
                  ? 'bg-vsaad-purple text-white'
                  : 'bg-[#171720] text-vsaad-ivory-muted hover:text-white'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-xs transition-colors ${
                  selectedTag === tag
                    ? 'bg-vsaad-purple text-white'
                    : 'bg-[#171720] text-vsaad-ivory-muted hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="group bg-[#0F0F14] border border-[#22222E] hover:border-vsaad-purple/40 rounded-sm overflow-hidden flex flex-col justify-between transition-colors"
              >
                <Link to={`/journal/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-sans text-vsaad-ivory-dark mb-2">
                      <span className="text-vsaad-purple-light uppercase tracking-wider font-semibold">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link to={`/journal/${post.slug}`} className="block">
                      <h2 className="text-xl font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-vsaad-ivory-muted font-sans mt-2.5 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1C1C26] flex items-center justify-between text-xs text-vsaad-ivory-dark font-sans">
                    <span className="text-[11px]">{post.date}</span>
                    <Link
                      to={`/journal/${post.slug}`}
                      className="inline-flex items-center gap-1 text-vsaad-purple-light hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#0F0F14] border border-[#22222E] rounded-sm p-8">
            <h3 className="text-lg font-display text-vsaad-ivory">No Articles Found</h3>
            <p className="text-xs text-vsaad-ivory-muted mt-1 font-sans">
              No journal articles matched your search query. Try another term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
