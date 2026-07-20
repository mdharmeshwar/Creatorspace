import { useState, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Feather, X } from 'lucide-react';
import { APP_NAME } from '../../constants';

export default function Navbar({ onOpenCreate, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const location = useLocation();

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
    onSearch?.('');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: '16px 24px' }}
    >
      <motion.div
        className="glass mx-auto flex items-center justify-between gap-4"
        style={{
          maxWidth: 1200,
          borderRadius: 'var(--radius-xl)',
          padding: '10px 20px',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-primary)',
              boxShadow: '0 0 16px rgba(92,95,255,0.5)',
            }}
          >
            <Feather size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--color-text-1)',
              letterSpacing: '-0.02em',
            }}
          >
            {APP_NAME}
          </span>
        </Link>


        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.div
                key="search-open"
                className="flex items-center gap-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div className="relative w-full">
                  <Search
                    size={15}
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-3)',
                    }}
                  />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Search posts…"
                    className="field-input"
                    style={{
                      paddingLeft: 34,
                      paddingTop: 8,
                      paddingBottom: 8,
                      fontSize: '0.85rem',
                    }}
                    onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                  />
                </div>
                <button
                  className="btn-icon"
                  onClick={closeSearch}
                  aria-label="Close search"
                  type="button"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="search-closed"
                className="btn-icon"
                onClick={openSearch}
                aria-label="Open search"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search size={17} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Explore link — right of search */}
          <a
            href="#feed"
            className="hidden md:inline-flex"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-text-2)',
              textDecoration: 'none',
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-2)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Explore
          </a>

          {/* Create button */}
          <motion.button
            className="btn-primary hidden sm:inline-flex"
            onClick={onOpenCreate}
            type="button"
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              add
            </span>
            Publish
          </motion.button>


        </div>
      </motion.div>
    </header>
  );
}
