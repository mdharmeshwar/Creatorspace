import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import { ANIMATION } from '../../constants';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const INDIGO_GRADIENTS = [
  'linear-gradient(135deg, #5c5fff 0%, #a78bfa 100%)',
  'linear-gradient(135deg, #38bdf8 0%, #5c5fff 100%)',
  'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
  'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
];

export default function PostCard({ post, onDelete, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const gradient = INDIGO_GRADIENTS[index % INDIGO_GRADIENTS.length];

  return (
    <motion.article
      layout
      {...ANIMATION.CARD}
      transition={{ ...ANIMATION.CARD.transition, delay: index * 0.06 }}
      className="card break-inside-avoid"
      style={{ padding: 0, overflow: 'hidden' }}
      data-testid={`post-card-${post._id}`}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            style={{
              width: '100%',
              aspectRatio: '16/10',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '16/10',
              background: gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'rgba(255,255,255,0.5)' }}>
              image
            </span>
          </div>
        )}

        {/* Time badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 12,
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 500,
          }}
        >
          {formatDate(post.createdAt)}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px' }}>
        {/* Title */}
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: '0.95rem',
            fontWeight: 650,
            color: 'var(--color-text-1)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </h3>

        {/* Description */}
        {post.description && (
          <p
            style={{
              margin: '0 0 16px',
              fontSize: '0.83rem',
              color: 'var(--color-text-2)',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.description}
          </p>
        )}

        {/* Footer actions */}
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12 }}
        >
          {/* Engagement */}
          <div className="flex items-center gap-1">
            <motion.button
              type="button"
              className="btn-icon"
              onClick={() => setLiked((v) => !v)}
              aria-label={liked ? 'Unlike post' : 'Like post'}
              whileTap={{ scale: 0.85 }}
              style={{ color: liked ? '#f87171' : 'var(--color-text-2)', gap: 4, width: 'auto', padding: '6px 10px' }}
            >
              <Heart size={15} fill={liked ? '#f87171' : 'none'} strokeWidth={2} />
              <span style={{ fontSize: '0.78rem' }}>{liked ? 'Liked' : 'Like'}</span>
            </motion.button>

            <button
              type="button"
              className="btn-icon"
              aria-label="Comment"
              style={{ color: 'var(--color-text-2)', width: 'auto', padding: '6px 10px', gap: 4 }}
            >
              <MessageCircle size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Right: bookmark + delete */}
          <div className="flex items-center gap-1" style={{ position: 'relative' }}>
            <button
              type="button"
              className="btn-icon"
              aria-label="Bookmark"
              style={{ color: 'var(--color-text-2)' }}
            >
              <Bookmark size={15} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="btn-icon"
              aria-label="Delete post"
              onClick={() => onDelete(post._id)}
              style={{ color: 'var(--color-text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
