import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePostForm from '../components/forms/CreatePostForm';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('CreatePostForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:preview'),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('requires an image before publishing', async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(<CreatePostForm onCreate={onCreate} />);

    await user.type(screen.getByPlaceholderText('Title'), 'Sprint 11');
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Document aligned post');
    await user.click(screen.getByRole('button', { name: 'Publish' }));

    expect(onCreate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('An image is required');
  });

  it('submits multipart-ready values and shows success feedback', async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue({ _id: '1' });
    const file = new File(['image'], 'cover.png', { type: 'image/png' });

    const { container } = render(<CreatePostForm onCreate={onCreate} />);

    await user.type(screen.getByPlaceholderText('Title'), 'Sprint 11');
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Document aligned post');
    await user.upload(container.querySelector('input[type="file"]'), file);
    await user.click(screen.getByRole('button', { name: 'Publish' }));

    await waitFor(() => expect(onCreate).toHaveBeenCalledTimes(1));
    expect(toast.success).toHaveBeenCalledWith('Post created');
  });
});
