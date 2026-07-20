import { AnimatePresence, motion } from 'framer-motion';
import PostCard from '../../components/cards/PostCard';
import { PostCardSkeleton, EmptyState, ErrorState } from '../../components/feedback/states';

export default function PostFeed({ posts, loading, error, onRetry, onDelete, onCreateFirst, searchQuery }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  const filtered = searchQuery
    ? posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : posts;

  if (filtered.length === 0 && posts.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        hint="Create your first post to get started. Your work belongs in front of the world."
        onAction={onCreateFirst}
        actionLabel="Create your first post"
      />
    );
  }

  if (filtered.length === 0 && searchQuery) {
    return (
      <EmptyState
        title={`No results for "${searchQuery}"`}
        hint="Try a different keyword or clear your search."
      />
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        {filtered.map((post, index) => (
          <PostCard key={post._id} post={post} onDelete={onDelete} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
