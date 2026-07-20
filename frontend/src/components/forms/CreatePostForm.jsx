import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X, Upload, ImageIcon } from 'lucide-react';
import { CHAR_LIMITS, MAX_FILE_SIZE_MB } from '../../constants';

function CharCounter({ value = '', limit }) {
  const remaining = limit - value.length;
  const warn = remaining < Math.floor(limit * 0.15);
  return (
    <span
      style={{
        fontSize: '0.72rem',
        color: warn ? 'var(--color-warning)' : 'var(--color-text-3)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {remaining}
    </span>
  );
}

export default function CreatePostForm({ onCreate, onClose }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { title: '', description: '' } });

  const titleVal = watch('title') || '';
  const descVal = watch('description') || '';

  const processFile = useCallback((f) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Max file size is ${MAX_FILE_SIZE_MB} MB`);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

  const onFileInput = (e) => processFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (values) => {
    if (!file) {
      toast.error('An image is required');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('image', file);
      await onCreate(formData);
      reset();
      clearFile();
      toast.success('Post created');
      onClose?.();
    } catch (err) {
      toast.error(err.friendly || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="glass"
      style={{
        width: '100%',
        maxWidth: 540,
        borderRadius: 'var(--radius-xl)',
        padding: '28px 28px 24px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--color-text-1)',
              margin: 0,
              letterSpacing: '-0.025em',
            }}
          >
            New post
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.83rem', color: 'var(--color-text-2)' }}>
            Share something remarkable with the world
          </p>
        </div>
        {onClose && (
          <button
            className="btn-icon"
            onClick={onClose}
            type="button"
            aria-label="Close"
            style={{ flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(submit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-text-2)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Title
            </label>
            <CharCounter value={titleVal} limit={CHAR_LIMITS.TITLE} />
          </div>
          <input
            className="field-input"
            placeholder="Title"
            maxLength={CHAR_LIMITS.TITLE}
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 3, message: 'Min 3 characters' },
            })}
          />
          {errors.title && (
            <p style={{ marginTop: 5, fontSize: '0.78rem', color: 'var(--color-danger)' }}>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-text-2)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Description
            </label>
            <CharCounter value={descVal} limit={CHAR_LIMITS.DESCRIPTION} />
          </div>
          <textarea
            className="field-input"
            placeholder="What's on your mind?"
            maxLength={CHAR_LIMITS.DESCRIPTION}
            rows={4}
            style={{ resize: 'vertical', minHeight: 110 }}
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 3, message: 'Min 3 characters' },
            })}
          />
          {errors.description && (
            <p style={{ marginTop: 5, fontSize: '0.78rem', color: 'var(--color-danger)' }}>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image upload */}
        <div>
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface-2)',
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                />
                <div
                  className="flex items-center justify-between"
                  style={{ padding: '10px 12px', gap: 10 }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: 'var(--color-text-1)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {file?.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                  </div>
                  <button className="btn-ghost" onClick={clearFile} type="button" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
                    Remove
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="drop-zone"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                style={{
                  width: '100%',
                  padding: '32px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px dashed ${dragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: dragging ? 'var(--color-primary-dim)' : 'var(--color-surface-2)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: dragging ? 'var(--color-primary)' : 'var(--color-surface-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                >
                  <Upload size={20} color={dragging ? '#fff' : 'var(--color-text-2)'} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-1)', fontWeight: 500 }}>
                    {dragging ? 'Drop to upload' : 'Drop image here'}
                  </p>
                  <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: 'var(--color-text-3)' }}>
                    or click to browse · PNG, JPG, WEBP · max {MAX_FILE_SIZE_MB} MB
                  </p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileInput} />
        </div>

        {/* Submit */}
        <motion.button
          className="btn-primary"
          type="submit"
          disabled={submitting}
          style={{ width: '100%', padding: '13px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
          whileTap={{ scale: 0.97 }}
        >
          {submitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }}
              />
              Publishing…
            </span>
          ) : (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }} aria-hidden="true">send</span>
              Publish
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
