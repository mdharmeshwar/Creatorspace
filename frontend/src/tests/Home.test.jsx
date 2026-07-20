import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { postsApi } from '../api/posts.api';

vi.mock('../api/posts.api', () => ({
  postsApi: {
    list: vi.fn(),
    create: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderPage() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  }

  it('renders posts after loading', async () => {
    postsApi.list.mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'Hello',
          description: 'world',
          imageUrl: 'x',
          createdAt: new Date().toISOString(),
        },
      ],
    });

    renderPage();

    await waitFor(() => expect(screen.getByText('Hello')).toBeInTheDocument());
  });

  it('shows loading placeholders while the feed request is pending', () => {
    postsApi.list.mockImplementation(() => new Promise(() => {}));

    const { container } = renderPage();

    expect(screen.getByText('Latest posts')).toBeInTheDocument();
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows a retry state when the feed request fails', async () => {
    postsApi.list.mockRejectedValue(new Error('Backend unavailable'));

    renderPage();

    await waitFor(() => expect(screen.getByText('Backend unavailable')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('shows the empty state when no posts are returned', async () => {
    postsApi.list.mockResolvedValue({ data: [] });

    renderPage();

    await waitFor(() => expect(screen.getByText('Nothing here yet')).toBeInTheDocument());
  });

  it('filters posts based on search query', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    postsApi.list.mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'My first job',
          description: 'world',
          imageUrl: 'x',
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          title: 'Another post',
          description: 'something else',
          imageUrl: 'x',
          createdAt: new Date().toISOString(),
        },
      ],
    });

    renderPage();

    await waitFor(() => expect(screen.getByText('My first job')).toBeInTheDocument());
    expect(screen.getByText('Another post')).toBeInTheDocument();

    // Open search
    await user.click(screen.getByRole('button', { name: 'Open search' }));

    // Type in search
    const searchInput = screen.getByPlaceholderText('Search posts…');
    await user.type(searchInput, 'first');

    // Wait for debounce and check that only 'My first job' is visible
    await waitFor(() => expect(screen.queryByText('Another post')).not.toBeInTheDocument(), { timeout: 1500 });
    expect(screen.getByText('My first job')).toBeInTheDocument();
  });
});
