import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ChevronRight, Tag } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadJournalDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useVsaad();

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-36 pb-20 px-4 text-center">
        <h2 className="text-2xl font-display">Article Not Found</h2>
        <Link
          to="/journal"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-vsaad-purple text-white text-xs uppercase tracking-wider rounded-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>
      </div>
    );
  }

  // Related posts
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  // Split content by paragraphs/headings
  const sections = post.content.split('\n\n');

  return (
    <div className="bg-[#08080A] text-vsaad-ivory min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-vsaad-ivory-dark hover:text-vsaad-purple-light transition-colors mb-8 font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-vsaad-ivory-dark">
            <span className="text-vsaad-purple-light font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-vsaad-purple" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-vsaad-purple" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-light text-vsaad-ivory leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-vsaad-purple/20 border border-vsaad-purple/40 flex items-center justify-center text-vsaad-purple-light font-bold text-xs">
              VR
            </div>
            <div>
              <p className="text-xs text-vsaad-ivory font-medium font-sans">{post.author}</p>
              <p className="text-[10px] text-vsaad-ivory-dark font-sans">VSAAD Senior Masonry Advisory</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-[#22222E] mb-12 bg-black">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base font-sans text-vsaad-ivory-muted leading-relaxed">
          {sections.map((sec, idx) => {
            if (sec.startsWith('### ')) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-display font-normal text-vsaad-ivory pt-4 pb-1 border-b border-[#1C1C26]"
                >
                  {sec.replace('### ', '')}
                </h2>
              );
            }
            if (sec.startsWith('- ')) {
              const bullets = sec.split('\n');
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside text-vsaad-ivory-muted pl-2">
                  {bullets.map((b, bi) => (
                    <li key={bi}>{b.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{sec}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#1C1C26] flex flex-wrap items-center gap-2">
            <span className="text-xs text-vsaad-ivory-dark uppercase tracking-wider flex items-center gap-1 font-sans mr-2">
              <Tag className="w-3.5 h-3.5" />
              Tags:
            </span>
            {post.tags.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-xs bg-[#121218] border border-[#2A2A38] text-xs text-vsaad-ivory-muted font-sans"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles Strip */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#1C1C26]">
            <h2 className="text-2xl font-display text-vsaad-ivory mb-6">Related Readings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.id}
                  to={`/journal/${rel.slug}`}
                  className="group p-5 bg-[#0F0F14] border border-[#22222E] hover:border-vsaad-purple/40 rounded-sm transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] text-vsaad-purple-light uppercase tracking-wider font-mono">
                      {rel.category}
                    </span>
                    <h3 className="text-base font-display text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors mt-1 line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#1C1C26] flex items-center justify-between text-xs text-vsaad-ivory-dark">
                    <span>{rel.readTime}</span>
                    <span className="text-vsaad-purple-light flex items-center gap-1">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
