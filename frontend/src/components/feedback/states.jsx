import { motion } from 'framer-motion';

export function Skeleton({ className = '', style = {} }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

export function PostCardSkeleton() {
  return (
    <div className="card break-inside-avoid" style={{ padding: 16 }} aria-busy="true" aria-label="Loading post">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton style={{ width: 36, height: 36, borderRadius: '50%' }} />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton style={{ height: 12, width: '45%' }} />
          <Skeleton style={{ height: 10, width: '30%' }} />
        </div>
      </div>
      <Skeleton className="animate-pulse" style={{ height: 200, width: '100%', marginBottom: 14 }} />
      <Skeleton style={{ height: 13, width: '70%', marginBottom: 8 }} />
      <Skeleton style={{ height: 11, width: '90%', marginBottom: 6 }} />
      <Skeleton style={{ height: 11, width: '60%', marginBottom: 16 }} />
      <div className="flex gap-3">
        <Skeleton style={{ height: 28, width: 56, borderRadius: 'var(--radius-full)' }} />
        <Skeleton style={{ height: 28, width: 56, borderRadius: 'var(--radius-full)' }} />
      </div>
    </div>
  );
}

export function EmptyState({
  title = 'Nothing here yet',
  hint = 'Create your first post to get started.',
  onAction,
  actionLabel = 'Create post',
}) {
  return (
    <motion.div
      className="card"
      style={{ padding: '64px 32px', textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-primary-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(92,95,255,0.2)',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-primary)' }}>
          auto_stories
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 10 }}>
        {title}
      </p>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-2)', maxWidth: 360, margin: '0 auto 28px' }}>
        {hint}
      </p>
      {onAction && (
        <button className="btn-primary" onClick={onAction} type="button">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      className="card"
      style={{ padding: '64px 32px', textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(248, 113, 113, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(248,113,113,0.2)',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-danger)' }}>
          wifi_off
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 10 }}>
        Unable to load feed
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', maxWidth: 400, margin: '0 auto 28px', wordBreak: 'break-word' }}>
        {message}
      </p>
      {onRetry && (
        <button className="btn-ghost" onClick={onRetry} type="button">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">refresh</span>
          Retry
        </button>
      )}
    </motion.div>
  );
}
