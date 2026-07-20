import { useCallback, useEffect, useState } from 'react';
import { postsApi } from '../api/posts.api';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await postsApi.list();
      setPosts(res.data || []);
    } catch (err) {
      setError(err.friendly || err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createPost = async (formData) => {
    const res = await postsApi.create(formData);
    setPosts((p) => [res.data, ...p]);
    return res.data;
  };

  const deletePost = async (id) => {
    await postsApi.remove(id);
    setPosts((p) => p.filter((x) => x._id !== id));
  };

  return { posts, loading, error, refetch: fetchAll, createPost, deletePost };
}
