import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Code display */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 9rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          background: 'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 24,
          userSelect: 'none',
        }}
      >
        404
      </div>

      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--color-text-3)' }}>
          search_off
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 800,
          color: 'var(--color-text-1)',
          margin: '0 0 10px',
          letterSpacing: '-0.02em',
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-2)',
          maxWidth: 360,
          lineHeight: 1.65,
          margin: '0 auto 32px',
        }}
      >
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="btn-primary"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        <Home size={16} />
        Back to home
      </Link>
    </motion.div>
  );
}
