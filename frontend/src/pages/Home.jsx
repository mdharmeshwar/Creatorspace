import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { usePosts } from '../hooks/usePosts';
import Navbar from '../components/layout/Navbar';
import CreatePostForm from '../components/forms/CreatePostForm';
import PostFeed from '../features/posts/PostFeed';
import { APP_NAME, APP_TAGLINE, ANIMATION } from '../constants';
import { Feather, TrendingUp, Users } from 'lucide-react';

const TRENDING = [
  { meta: 'Design • Trending', tag: '#MinimalistUI', count: '12.4k posts' },
  { meta: 'Tech • Hot', tag: '#AIEngineering', count: '9.8k posts' },
  { meta: 'Art • Rising', tag: '#DigitalCraft', count: '5.2k posts' },
];

function HeroSection({ onOpenCreate }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '80px 0 64px',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -60,
          right: -80,
          width: 440,
          height: 440,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,95,255,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Two-column hero layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* ── LEFT: Text content ── */}
        <div>
          {/* Badge */}
          <motion.div
            {...ANIMATION.STAGGER_CHILD}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 14px 5px 8px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(92,95,255,0.3)',
                background: 'rgba(92,95,255,0.1)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-aurora)',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather size={11} color="#fff" />
              </div>
              Premium Creator Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...ANIMATION.STAGGER_CHILD}
            transition={{ duration: 0.55, delay: 0.12 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--color-text-1)',
              margin: '0 0 20px',
            }}
          >
            Ideas that{' '}
            <span className="text-gradient">
              move
            </span>{' '}
            the world.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...ANIMATION.STAGGER_CHILD}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-2)',
              lineHeight: 1.7,
              maxWidth: 440,
              margin: '0 0 36px',
            }}
          >
            {APP_TAGLINE} Publish posts, upload visuals, and build your presence on the platform built for creators.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            {...ANIMATION.STAGGER_CHILD}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <button
              className="btn-primary"
              onClick={onOpenCreate}
              type="button"
              style={{ padding: '13px 28px', fontSize: '0.95rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
              Start Publishing
            </button>
            <a
              href="#feed"
              className="btn-ghost"
              style={{ padding: '12px 24px', fontSize: '0.95rem', textDecoration: 'none' }}
            >
              Browse Feed
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-6 flex-wrap"
            {...ANIMATION.STAGGER_CHILD}
            transition={{ duration: 0.5, delay: 0.36 }}
            style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--color-border)' }}
          >
            {[
              { icon: <Feather size={15} />, label: 'Posts published', value: 'Live' },
              { icon: <TrendingUp size={15} />, label: 'Real-time updates', value: 'MERN' },
              { icon: <Users size={15} />, label: 'Full CRUD pipeline', value: '✓' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span style={{ color: 'var(--color-primary)' }}>{icon}</span>
                <span style={{ fontSize: '0.83rem', color: 'var(--color-text-3)' }}>{label}</span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--color-text-2)',
                    background: 'var(--color-surface-2)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 2×2 grid card collage ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 12,
            height: 440,
          }}
        >
          {/* Card 1 — top-left */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)',
              background: 'var(--color-surface-1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=85&auto=format&fit=crop"
              alt="Creative workspace"
              style={{ width: '100%', flex: 1, objectFit: 'cover', display: 'block', minHeight: 0 }}
            />
            <div style={{ padding: '10px 12px', flexShrink: 0 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 600, padding: '2px 7px',
                borderRadius: 'var(--radius-full)', background: 'rgba(92,95,255,0.15)',
                color: 'var(--color-aurora)', border: '1px solid rgba(92,95,255,0.25)'
              }}>Design</span>
              <p style={{ margin: '5px 0 0', fontSize: '0.75rem', fontWeight: 650, color: 'var(--color-text-1)', lineHeight: 1.3 }}>
                Minimal Workspaces
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '0.68rem', color: 'var(--color-text-3)' }}>Alex Chen · 4 min</p>
            </div>
          </motion.div>

          {/* Card 2 — top-right */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
              background: 'var(--color-surface-1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=85&auto=format&fit=crop"
              alt="AI technology"
              style={{ width: '100%', flex: 1, objectFit: 'cover', display: 'block', minHeight: 0 }}
            />
            <div style={{ padding: '10px 12px', flexShrink: 0 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 600, padding: '2px 7px',
                borderRadius: 'var(--radius-full)', background: 'rgba(56,189,248,0.15)',
                color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)'
              }}>AI</span>
              <p style={{ margin: '5px 0 0', fontSize: '0.75rem', fontWeight: 650, color: 'var(--color-text-1)', lineHeight: 1.3 }}>
                Future of AI Engineering
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '0.68rem', color: 'var(--color-text-3)' }}>Sara M. · 6 min</p>
            </div>
          </motion.div>

          {/* Card 3 — bottom-left */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
              background: 'var(--color-surface-1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=85&auto=format&fit=crop"
              alt="Digital design"
              style={{ width: '100%', flex: 1, objectFit: 'cover', display: 'block', minHeight: 0 }}
            />
            <div style={{ padding: '10px 12px', flexShrink: 0 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 600, padding: '2px 7px',
                borderRadius: 'var(--radius-full)', background: 'rgba(167,139,250,0.15)',
                color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)'
              }}>Art</span>
              <p style={{ margin: '5px 0 0', fontSize: '0.75rem', fontWeight: 650, color: 'var(--color-text-1)', lineHeight: 1.3 }}>
                Digital Craft in 2025
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '0.68rem', color: 'var(--color-text-3)' }}>Lena K. · 3 min</p>
            </div>
          </motion.div>

          {/* Card 4 — bottom-right */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
              background: 'var(--color-surface-1)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=85&auto=format&fit=crop"
              alt="Writing and blogging"
              style={{ width: '100%', flex: 1, objectFit: 'cover', display: 'block', minHeight: 0 }}
            />
            {/* Live badge overlay */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16,185,129,0.18)',
                border: '1px solid rgba(16,185,129,0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#10b981', boxShadow: '0 0 6px #10b981',
                display: 'block', flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981' }}>Live</span>
            </motion.div>
            <div style={{ padding: '10px 12px', flexShrink: 0 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 600, padding: '2px 7px',
                borderRadius: 'var(--radius-full)', background: 'rgba(16,185,129,0.15)',
                color: '#10b981', border: '1px solid rgba(16,185,129,0.25)'
              }}>Writing</span>
              <p style={{ margin: '5px 0 0', fontSize: '0.75rem', fontWeight: 650, color: 'var(--color-text-1)', lineHeight: 1.3 }}>
                Craft Your Story
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '0.68rem', color: 'var(--color-text-3)' }}>James R. · 5 min</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { posts, loading, error, refetch, createPost, deletePost } = usePosts();
  const [createOpen, setCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const feedRef = useRef(null);

  // Auto-scroll to feed when user starts a search
  useEffect(() => {
    if (searchQuery.trim()) {
      feedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchQuery]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar
        onOpenCreate={() => setCreateOpen(true)}
        onSearch={setSearchQuery}
      />

      <main
        className="mx-auto"
        style={{ maxWidth: 1200, padding: '0 24px 80px' }}
      >
        {/* Hero */}
        <div style={{ paddingTop: 104 }}>
          <HeroSection onOpenCreate={() => setCreateOpen(true)} />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          {/* Feed column */}
          <div className="lg:col-span-8" id="feed" ref={feedRef}>
            {/* Feed header */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-text-1)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {searchQuery ? (
                    <>
                      Results for{' '}
                      <span className="text-gradient">&ldquo;{searchQuery}&rdquo;</span>
                    </>
                  ) : 'Latest posts'}
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'var(--color-text-3)' }}>
                  {loading
                    ? 'Loading…'
                    : searchQuery
                    ? (() => {
                        const count = posts.filter(
                          (p) =>
                            p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
                        ).length;
                        return `${count} result${count !== 1 ? 's' : ''} found`;
                      })()
                    : `${posts.length} post${posts.length !== 1 ? 's' : ''} published`}
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={() => setCreateOpen(true)}
                type="button"
                style={{ padding: '9px 18px', fontSize: '0.83rem' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>add</span>
                New post
              </button>
            </motion.div>

            <PostFeed
              posts={posts}
              loading={loading}
              error={error}
              onRetry={refetch}
              onDelete={deletePost}
              onCreateFirst={() => setCreateOpen(true)}
              searchQuery={searchQuery}
            />
          </div>

          {/* Right rail */}
          <aside className="hidden lg:block lg:col-span-4">
            <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Trending */}
              <motion.div
                className="card"
                style={{ padding: '20px 22px' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} color="var(--color-primary)" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--color-text-1)',
                      margin: 0,
                    }}
                  >
                    Trending
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {TRENDING.map((item, i) => (
                    <div
                      key={item.tag}
                      style={{ cursor: 'pointer' }}
                      className="group"
                    >
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--color-text-3)', marginBottom: 3 }}>
                        {item.meta}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--color-text-1)',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-1)')}
                      >
                        {item.tag}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* About */}
              <motion.div
                className="card"
                style={{ padding: '20px 22px' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.26 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Feather size={14} color="#fff" />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: 'var(--color-text-1)',
                    }}
                  >
                    {APP_NAME}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  A professional MERN stack publishing platform. Create, share, and explore high-quality content.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    paddingTop: 14,
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {['Terms', 'Privacy', 'Help'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-3)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-3)')}
                    >
                      {link}
                    </a>
                  ))}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>· © 2025</span>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </main>

      {/* Create post modal */}
      <AnimatePresence>
        {createOpen && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={(e) => e.target === e.currentTarget && setCreateOpen(false)}
          >
            <CreatePostForm
              onCreate={createPost}
              onClose={() => setCreateOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile FAB */}
      <motion.button
        className="sm:hidden btn-primary"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 40,
          width: 56,
          height: 56,
          borderRadius: '50%',
          padding: 0,
          boxShadow: '0 8px 32px rgba(92,95,255,0.45)',
        }}
        onClick={() => setCreateOpen(true)}
        type="button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Create post"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
      </motion.button>
    </div>
  );
}
