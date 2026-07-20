import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCard from '../components/cards/PostCard';

describe('PostCard', () => {
  it('calls delete with the post id', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <PostCard
        post={{
          _id: 'post-1',
          title: 'Sprint 11',
          description: 'Delete flow test',
          imageUrl: '/demo.png',
          createdAt: '2026-07-20T00:00:00.000Z',
        }}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Delete post' }));

    expect(onDelete).toHaveBeenCalledWith('post-1');
  });
});
